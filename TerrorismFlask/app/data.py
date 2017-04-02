import csv
from collections import defaultdict, Counter
import utils

from nltk.corpus import stopwords
from string import punctuation
import re

from pprint import pprint
import time 

from random import random

import datetime

en_stopwords = stopwords.words("english")
own_stop = ['unknown']


def get_words(doc):
    # Remove punctuation and spaces #justincase
    doc = ''.join(map(lambda ch: ch if ch not in punctuation else ' ', doc))
    doc = re.sub(r'[ \t\n\r\f\v]+', ' ', doc)
    doc = re.sub(r'[0-9]{1,2}', ' ', doc).strip()
    words = doc.lower().split()
    words = [word for word in words if word and not word in en_stopwords + own_stop]

    return words


def get_cnts(obj, cnt_type):
    return int(float(obj[cnt_type])) if obj[cnt_type] else 0


def form_date(obj):
#    year, month, day = map(int, (obj['iyear'], obj['imonth'], obj['iday']))
#    print year, month, day
#    return datetime.date(year, month, day).isoformat()
    year, month, day = map(lambda x: x.zfill(2), (obj['iyear'], obj['imonth'], obj['iday']))
    return '-'.join((year, month, day))
 
def get_year_interval(obj):
    year = int(obj['iyear'])
    return year + (5 - year % 5)
    

class GTDData(object):
    def __init__(self, data_path):
        self.load_data(data_path)
        self.init_data()

    
    def load_data(self, data_path):
        self.data = utils.read_csv(data_path)


    def init_data(self):
        start = time.time()       

        self.attackids_per_country = defaultdict(list)
        self.attackids_per_region = defaultdict(list)
        self.country_basics = defaultdict(lambda: defaultdict(int))
        self.data_per_attack = {}

#        self.facets = defaultdict(lambda: defaultdict(list))
        self.facets = defaultdict(lambda: defaultdict(dict))

        self.locations = {}

        self.location_clusters = defaultdict(list)

        self.propvalues = []
        self.sorted_propvalues = {}
        self.unestimated_propvalues = {}

        for row in self.data:
            attackid = row['eventid']
            country = row['country_txt']                     
           
            attack_data = {'victims_count': int(float(row['nkill'])) if row['nkill'] else 0,
                           'wounded_count': int(float(row['nwound'])) if row['nwound'] else 0,
                           'city': row['city'],
                           'country': row['country_txt'],
                           'region': row['region_txt'],
                           'lng': float(row['longitude']) if row['longitude'] else None,
                           'lat': float(row['latitude']) if row['latitude'] else None,
                           'date': form_date(row),
                           'period': get_year_interval(row),
                           'group': row['gname'].decode('utf-8', 'ignore'),
                           'nationality': row['natlty1_txt'],
                           'attacktype_id':row['attacktype1'],
                           'attacktype': row['attacktype1_txt'],
                           'targettype': row['targtype1_txt'],
                           'target': row['target1'],
                           'weapontype': row['weaptype1_txt'],
                           'weapon': row['weapdetail'],
                           'summary': row['summary'],
                           'motive': row['motive'],
                           'propvalue': float(row['propvalue']) if row['propvalue'] else 0
                          }
             

            self.attackids_per_country[country].append(attackid)
            self.attackids_per_region[attack_data['region']].append(attackid)
            self.data_per_attack[attackid] = attack_data
            """            
            self.country_basics[country]['attacks_count'] += 1

            for field in ['victims_count', 'wounded_count']:
                self.country_basics[country][field] += attack_data[field]
            """
            self.country_basics['attacks_count'][country] += 1

            for field in ['victims_count', 'wounded_count', 'propvalue']:
                self.country_basics[field][country] += attack_data[field]

#            self.location_clusters[(attack_data['lng'], attack_data['lat'])].append(attackid)

            self.propvalues.append((attack_data["country"], int(attackid[0:4]), attack_data["propvalue"]))

            #TODO: Random sampling for now, fix all sampled stuffs (locations and facets) later
            #TODO: Also approximate and add the locations of the missing points
            if attack_data['lng'] and attack_data['lat'] and random() < 0.1:
                self.location_clusters[(attack_data['lng'], attack_data['lat'])].append(attackid)
                self.locations[attackid] = {'lng': attack_data['lng'],
                                        'lat': attack_data['lat'],
                                        'attacktype_id': attack_data['attacktype_id'],
                                        'attacktype': attack_data['attacktype'],
                                        'targettype': attack_data['targettype']
                                        }
#                self.facets['attacktype'][attack_data['attacktype']].append(attackid)
#                self.facets['targettype'][attack_data['targettype']].append(attackid)
                for facet_name in ['attacktype', 'targettype']:
                    self.facets[facet_name][attack_data[facet_name]][attackid] = {'lng': attack_data['lng'],
                                                                                  'lat': attack_data['lat']}

        self.countries = sorted(self.attackids_per_country.keys())
        self.attackids = sorted(self.data_per_attack.keys())
        self.data_per_country = {}
        self.n_attacks = len(self.attackids)

        for c in self.countries:
            self.sorted_propvalues[c] = {}
            self.unestimated_propvalues[c] = {}
            for i in range(1970, 2016, 1):
                self.sorted_propvalues[c][i] = 0
                self.unestimated_propvalues[c][i] = 0

        for val in self.propvalues:
            if val[2] > 0:
                self.sorted_propvalues[val[0]][val[1]] += val[2]
            elif val[2] < 0:
                self.unestimated_propvalues[val[0]][val[1]] += 1

        for attackid, attack_data in self.data_per_attack.iteritems():
            lng = attack_data['lng']
            lat = attack_data['lat']

            if len(self.location_clusters[(lng, lat)]) > 1: 
                self.data_per_attack[attackid]['markerType'] = 'cluster'
            else:
                self.data_per_attack[attackid]['markerType'] = 'individual'
       

        print 'Original locations:', len(self.data_per_attack)
        print 'After clustering:', len(self.location_clusters)
        print 'Total:', sum([len(cluster) for cluster in self.location_clusters.values()]) 
        print 'Actual clusters:', len([cluster for cluster in self.location_clusters.values() if len(cluster) > 1])
        print 'Major:', sorted([len(cluster) for cluster in self.location_clusters.values()], reverse=True)[:10]
        print 'Regions:', len(self.attackids_per_region), self.attackids_per_region.keys()
 
        print "Finished initializing in", time.time() - start, 'seconds'


    def aggregate_data(self, attackids):

        aggregated_data = {'attacks_count': len(attackids),
                           'victims_count': 0,
                           'wounded_count': 0,
                           'attacks_per_period': defaultdict(int),
                           'victims_per_period': defaultdict(int),
                           'wounded_per_period': defaultdict(int),
                           'attacktype': Counter(),
                           'targettype': Counter(),
                           'groups': Counter(),
                           'target_attack_corr': defaultdict(lambda: defaultdict(int)),
                           'words': Counter()
                           }

        for attackid in attackids:
            attack_data = self.data_per_attack[attackid]
            for field in ['victims_count', 'wounded_count']:
                aggregated_data[field] += attack_data[field]
            aggregated_data['attacks_per_period'][attack_data['period']] += 1
            aggregated_data['victims_per_period'][attack_data['period']] += attack_data['victims_count']
            aggregated_data['wounded_per_period'][attack_data['period']] += attack_data['wounded_count']
            for field in ['attacktype', 'targettype']:
                aggregated_data[field][attack_data[field]] += 1
            aggregated_data['target_attack_corr'][attack_data['targettype']][attack_data['attacktype']] += 1
            aggregated_data['groups'][attack_data['group']] += 1 if not attack_data['group'] == 'Unknown' else 0
            aggregated_data['words'].update(map(lambda x: x.decode('utf-8', 'ignore'), get_words(attack_data['summary'])))
#            aggregated_data['words'].update(map(lambda x: x.decode('utf-8', 'ignore'), get_words(attack_data['motive'])))

        aggregated_data['words'] = dict(aggregated_data['words'].most_common(100))

        return aggregated_data


    def get_country_data(self, country):
        try:
            return self.data_per_country[country]

        except Exception as e:
            attackids = self.attackids_per_country[country]
            self.data_per_country[country] = self.aggregate_data(attackids)

            return self.data_per_country[country]


    def get_country_counts(self):
        try:
            return self.country_counts

        except Exception as e:
            self.country_counts = []
            for country in self.countries:
                country_basics = {type_: self.country_basics[type_][country] for type_ in ['attacks_count', 'wounded_count', 'victims_count']}
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


    def get_marker_data(self, attackid):
        attack_data = self.get_attack_data(attackid)
        if attack_data['markerType'] == 'individual':
            return attack_data
        else:
            # If not individual, grab rest and aggregate
            cluster_elems = self.location_clusters[(attack_data['lng'], attack_data['lat'])]
            data = self.aggregate_data(cluster_elems) 
            # Cheat for plot titles...
            country_str = 'Cluster in '
            if attack_data['city']:
                country_str += attack_data['city']
            else:
                country_str += attack_data['country']
            data['country'] = country_str
            return data

    def get_random_attack_data(self, random_n):
        attackid = self.attackids[random_n]
        return self.get_attack_data(attackid) 


    def get_location(self):
        return self.locations

    def get_facets(self):
        return self.facets

    def get_sorted_propvalue(self, country):
        return self.sorted_propvalues[country]

    def get_country_basics(self):
        return self.country_basics

    def get_unestimated_propvalue(selfself, country):
        return self.unestimated_propvalues[country] 

