import sys
import csv

from collections import defaultdict

def read_csv(file_name):
    with open(file_name, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            yield row

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
        self.data = [fix_entry(row) for row in read_csv(data_path)]


    def get_country_counts(self):
        try:
            return self.country_counts
        except Exception as e:
            print 'Couldnt load counts:', e
            country_cnts = defaultdict(lambda: defaultdict(int))

            for row in self.data:
                country = row['country_txt']
                country_cnts[country]['attacks_count'] += 1
                country_cnts[country]['victims_count'] += row['nkill'] #get_cnts(row, 'nkill')
                country_cnts[country]['wounded_count'] += row['nwound'] #get_cnts(row, 'nwound')

            self.country_counts = [{'country': country,
                                    'attacks_count': country_cnts[country]['attacks_count'],
                                    'victims_count': country_cnts[country]['victims_count'],
                                    'wounded_count': country_cnts[country]['wounded_count']
                                   } for country in sorted(country_cnts)]

            return self.country_counts


