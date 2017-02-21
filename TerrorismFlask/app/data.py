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

def get_country_counts(file_name):
    country_cnts = defaultdict(lambda: defaultdict(int))

    for row in read_csv(file_name):
        country = row['country_txt']
        country_cnts[country]['attacks_count'] += 1
        country_cnts[country]['victims_count'] += get_cnts(row, 'nkill')
        country_cnts[country]['wounded_count'] += get_cnts(row, 'nwound')

    return [{'country': country,
             'attacks_count': country_cnts[country]['attacks_count'], 
             'victims_count': country_cnts[country]['victims_count'],
             'wounded_count': country_cnts[country]['wounded_count']
            } for country in sorted(country_cnts)]



