import os
import csv
from random import randint


def create_dir(dir_name):
    try:
        os.stat(dir_name)
    except:
        os.mkdir(dir_name)


def read_csv(file_name):
    with open(file_name, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            yield row


def generate_random_attack_id(max_id):
    return randint(0, max_id)
