import os
import csv


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


