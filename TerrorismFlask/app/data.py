import csv
from collections import defaultdict, Counter

import utils


def get_cnts(obj, cnt_type):
    return int(float(obj[cnt_type])) if obj[cnt_type] else 0


def fix_entry(attack_entry):
    #TODO: clean up; substitute empty strings with 0s where needed, etc
    for key in ['nkill', 'nwound']:
        attack_entry[key] = int(float(attack_entry[key])) if attack_entry[key] else 0
    return {key: attack_entry[key] for key in attack_entry if not attack_entry[key] == '' and not attack_entry[key] == '.'}


class GTDData(object):
    def __init__(self, data_path):
        self.load_data(data_path)


    def load_data(self, data_path):
        self.data = [fix_entry(row) for row in utils.read_csv(data_path)]
        self.n_attacks = len(self.data)
        print self.n_attacks

    
    def get_attack_data(self, attack_id):
        return self.data[attack_id]

    def get_data_per_country(self):
        try: 
            return self.data_per_country
        except:
#            self.data_per_country = defaultdict(lambda: defaultdict(int))
            self.data_per_country = defaultdict(lambda: {'attacks_count': 0,
                                                         'victims_count': 0,
                                                         'wounded_count': 0,
                                                         'attacktype': Counter(),
                                                         'targettype': Counter()})
            for row in self.data:
                country = row['country_txt']
                self.data_per_country[country]['attacks_count'] += 1
                self.data_per_country[country]['victims_count'] += row['nkill'] #get_cnts(row, 'nkill')
                self.data_per_country[country]['wounded_count'] += row['nwound'] #get_cnts(row, 'nwound')
                self.data_per_country[country]['attacktype'][row['attacktype1_txt']] += 1
                self.data_per_country[country]['targettype'][row['targtype1_txt']] += 1

            print len(self.data_per_country) 

            return self.data_per_country


    def get_country_data(self, country):
        try:
            return self.get_data_per_country()[country]
        except:
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


    def get_location(self):
        try:
            return self.locations
        except:
            self.locations=defaultdict(lambda :{'lng':0, 'lat':0})

            for i,row in enumerate(self.data):
                #print (type(row.get("longitude")))
                eventid = row.get("eventid",i);
                self.locations[eventid]['lng']=float(row.get("longitude",0))
                self.locations[eventid]['lat'] = float(row.get("latitude",0))
                #print(self.locations[i])

            return self.locations
