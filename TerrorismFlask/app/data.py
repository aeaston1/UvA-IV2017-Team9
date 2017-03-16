import csv
from collections import defaultdict, Counter
import utils

from nltk.corpus import stopwords
from string import punctuation
import re

from pprint import pprint
import time 

from random import random

en_stopwords = stopwords.words("english")



def get_words(doc):
    # Remove punctuation and spaces #justincase
    doc = ''.join(map(lambda ch: ch if ch not in punctuation else ' ', doc))
    doc = re.sub(r'[ \t\n\r\f\v]+', ' ', doc).strip()

    words = doc.lower().split()
    words = [word for word in words if word and not word in en_stopwords]

    return words


def get_cnts(obj, cnt_type):
    return int(float(obj[cnt_type])) if obj[cnt_type] else 0


def fix_entry(attack_entry):
    #TODO: clean up; substitute empty strings with 0s where needed, etc
    for key in ['nkill', 'nwound']:
        attack_entry[key] = int(float(attack_entry[key])) if attack_entry[key] else 0
    #TODO: fix the getting function instead of defdict
    entry = defaultdict(str)
    entry.update({key: attack_entry[key] for key in attack_entry if not attack_entry[key] == '' and not attack_entry[key] == '.'})
    return entry


class GTDData(object):
    def __init__(self, data_path):
        self.load_data(data_path)
        self.init_data()

    
    def load_data(self, data_path):
        self.data = utils.read_csv(data_path)


    def init_data(self):
        start = time.time()       

        self.attackids_per_country = defaultdict(list)
        self.country_basics = defaultdict(lambda: defaultdict(int))
        self.data_per_attack = {}

        self.facets = defaultdict(lambda: defaultdict(list))

        self.locations = {}

        for row in self.data:
            row = fix_entry(row)
            attackid = row['eventid']
            country = row['country_txt']                     

            attack_data = {'victims_count': row['nkill'],
                           'wounded_count': row['nwound'],
                           'country': row['country_txt'],
                           'region': row['region_txt'],
                           'lng': float(row.get("longitude", 0)),
                           'lat': float(row.get("latitude", 0)),
                           'group': row['gname'],
                           'nationality': row['natlty1_txt'],
                           'attacktype': row['attacktype1_txt'],
                           'targettype': row['targtype1_txt'],
                           'target': row['target1'],
                           'weapontype': row['weaptype1_txt'],
                           'weapon': row['weapdetail'],
                           'summary': row['summary'],
                           'motive': row['motive']
                          }

            self.attackids_per_country[country].append(attackid)
            self.data_per_attack[attackid] = attack_data

            self.country_basics[country]['attacks_count'] += 1
            for field in ['victims_count', 'wounded_count']:
                self.country_basics[country][field] += attack_data[field]


            #TODO: Random sampling for now, fix all sampled stuffs (locations and facets) later
            if random() < 0.1:
                self.locations[attackid] = {'lng': attack_data['lng'],
                                        'lat': attack_data['lat']}
                self.facets['attacktype'][attack_data['attacktype']].append(attackid)
                self.facets['targettype'][attack_data['targettype']].append(attackid)


        self.countries = sorted(self.attackids_per_country.keys())
        self.attackids = sorted(self.data_per_attack.keys())
        self.data_per_country = {}
        self.n_attacks = len(self.attackids)

        print "Finished initializing in", time.time() - start, 'seconds'


    def get_country_data(self, country):
        try:
            self.data_per_country[country]

        except Exception as e:
            attackids = self.attackids_per_country[country]

            country_data = {'attacks_count': len(attackids),
                            'victims_count': 0,
                            'wounded_count': 0,
                            'attacktype': Counter(),
                            'targettype': Counter(),
                            'target_attack_corr': defaultdict(lambda: defaultdict(int)),
                            'words': Counter()
                            }

            for attackid in attackids:
                attack_data = self.data_per_attack[attackid]
                for field in ['victims_count', 'wounded_count']:
                    country_data[field] += attack_data[field]
                for field in ['attacktype', 'targettype']:
                    country_data[field][attack_data[field]] += 1
                country_data['target_attack_corr'][attack_data['targettype']][attack_data['attacktype']] += 1
                #                country_data['words'].update(map(lambda x: x.decode('utf-8', 'ignore'), attack_data['summary'].split()))
                country_data['words'].update(map(lambda x: x.decode('utf-8', 'ignore'), get_words(attack_data['summary'])))


            for key in country_data['words'].keys():
                for stopword in en_stopwords:
                    if (stopword in key or (any(char.isdigit() for char in (key.encode('utf-8')))) or len(
                            key.encode('utf-8')) < 4):
                        del country_data['words'][key]

            country_data['words'] = dict(country_data['words'].most_common(100))
            self.data_per_country[country] = country_data
            return country_data


    def get_country_counts(self):
        try:
            return self.country_counts

        except Exception as e:
            self.country_counts = []
            for country in self.countries:
                country_basics = self.country_basics[country] 
                country_basics.update({'country': country})
                self.country_counts.append(country_basics)

            return self.country_counts

    def get_data_per_attack(self):
        return self.data_per_attack


    def get_attack_data(self, attackid):
        try:
            return self.data_per_attack[attackid]
        except Exception as e:
            print "Couldn't find attack", attackid
            print e
            return {}


    def get_random_attack_data(self, random_n):
        attackid = self.attackids[random_n]
        return self.get_attack_data(attackid) 


    def get_location(self):
        return self.locations

    def get_facets(self):
        return self.facets
