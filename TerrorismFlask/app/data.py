import csv
from collections import defaultdict, Counter

import utils

from pprint import pprint

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
        """
        So far the class has:
            self.data ([attackrow1, attackrow2...])
            self.n_attacks (int)
            self.data_per_country (dict with basic stuffs per attack)
            self.data_per_attack (dict with basic stuffs per attack)
            self.country_counts (useless stuffs)
            self.locations ({eventid: {long: .., lat: ..}... })
            
        """
        self.load_data(data_path)

    
    def load_data(self, data_path):
        self.data = list([fix_entry(row) for row in utils.read_csv(data_path)])
        self.n_attacks = len(self.data)
        print self.n_attacks


    def get_data_per_country(self):
        try: 
            return self.data_per_country
        except:
#            self.data_per_country = defaultdict(lambda: defaultdict(int))
            self.data_per_country = defaultdict(lambda: {'attacks_count': 0,
                                                         'victims_count': 0,
                                                         'wounded_count': 0,
                                                         'attacktype': Counter(),
                                                         'targettype': Counter(),
                                                         'target_attack_corr': defaultdict(lambda: defaultdict(int)),
                                                         'words': Counter()
                                                        })
            for row in self.data: 
                country = row['country_txt']
                self.data_per_country[country]['attacks_count'] += 1
                self.data_per_country[country]['victims_count'] += row['nkill'] #get_cnts(row, 'nkill')
                self.data_per_country[country]['wounded_count'] += row['nwound'] #get_cnts(row, 'nwound')
                self.data_per_country[country]['attacktype'][row['attacktype1_txt']] += 1
                self.data_per_country[country]['targettype'][row['targtype1_txt']] += 1
                self.data_per_country[country]['target_attack_corr'][row['targtype1_txt']][row['attacktype1_txt']] += 1
 
#                self.data_per_country[country]['words'].update(map(lambda x: x.decode('utf-8', 'ignore'), row['motive'].split()))
                self.data_per_country[country]['words'].update(map(lambda x: x.decode('utf-8', 'ignore'), row['summary'].split()))

            
            for country, country_data in self.data_per_country.iteritems():
                self.data_per_country[country]['words'] = dict(country_data['words'].most_common(100))


            print 'Countries found: ', len(self.data_per_country)

            return self.data_per_country


    def get_country_data(self, country):
        try:
            print country
            print self.get_data_per_country()[country]
            return self.get_data_per_country()[country]
        except Exception as e:
            print e
            return {}
 

    def get_country_counts(self):
        try:
            return self.country_counts
        except Exception as e:
            data_per_country = sorted(self.get_data_per_country().iteritems(), key=lambda item: item[0])
 
            self.country_counts = [{'country': country,
                                    'attacks_count': country_data['attacks_count'],
                                    'victims_count': country_data['victims_count'],
                                    'wounded_count': country_data['wounded_count']
                                   } for country, country_data in data_per_country]

            return self.country_counts

    def get_data_per_attack(self):
        try:
            return self.data_per_attack
        except:
            self.data_per_attack = {}

            for row in self.data:
                attackid = row['eventid']
                self.data_per_attack[attackid] = {'victims_count': row['nkill'],
                                                  'wounded_count': row['nwound'],
                                                  'country': row['country_txt'],
                                                  'region': row['region_txt'],
                                                  'group': row['gname'],
                                                  'nationality': row['natlty1_txt'],
                                                  'attacktype': row['attacktype1_txt'],
                                                  'targettype': row['targtype1_txt'],
                                                  'target': row['target1'],
                                                  'weapontype': row['weaptype1_txt'],
                                                  'weapon': row['weapdetail']
                                                 }

            return self.data_per_attack


    def get_attack_data(self, attackid):
        try:
            return self.get_data_per_attack()[attackid]
        except:
            return {}

    def get_attack_ids(self):
        try: 
            return self.attackids
        except:
            self.attackids = self.get_data_per_attack().keys()
            return self.attackids

    def get_random_attack_data(self, random_n):
        attackid = self.get_attack_ids()[random_n]
        return self.get_attack_data(attackid) 


    def get_location(self):
        try:
            return self.locations
        except:
            self.locations = defaultdict(lambda :{'lng': 0, 'lat': 0})

            for i, row in enumerate(self.data):

                #print (type(row.get("longitude")))
                eventid = row.get("eventid", 0)
                self.locations[eventid]['lng'] = float(row.get("longitude", 0))
                self.locations[eventid]['lat'] = float(row.get("latitude", 0))
                #print(self.locations[i])

            return self.locations
