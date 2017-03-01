import data





class Config(object):

    DATA_PATH = 'app/static/data/globalterrorismdb_0616dist.csv'

#    COUNTRY_COUNTS = data.get_country_counts(DATA_PATH)
    GTD_DATA = data.GTDData(DATA_PATH)
