import sys
import csv

from collections import Counter

def read_csv(file_name):
    with open(file_name, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            yield row

def get_country_counts(file_name):
    country_cnts = Counter()

    for row in read_csv(file_name):
        country_cnts[row['country_txt']] += 1


    return [{'country': country, 'count': country_cnts[country]} for country in sorted(country_cnts)]
