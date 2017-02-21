import sys
import csv

#import matplotlib.pyplot as plt
from pprint import pprint

from collections import Counter

from wordcloud import WordCloud, STOPWORDS

#from nltk.corpus import stopwords






def read_csv(file_name):
    with open(file_name, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            yield row



def get_basic_stuffs(file_name, country_name):
    cnt = 0
    victims = 0
    attacktype = Counter()
    targettype = Counter()
    summary = Counter()

    summarytext = ''
    motivetext = ''

    for row in read_csv(file_name):
        if row['country_txt'] == country_name:
            cnt += 1
            victims += int(float(row['nkill'])) if row['nkill'] else 0
            attacktype[row['attacktype1_txt']] += 1
            targettype[row['targtype1_txt']] += 1 
            summarytext += row['summary']
            motivetext += row['motive']
            #summary.update(row['summary'].split())
            #print "============ ", cnt, " ==========="
            #pprint(row)

    print victims, ' out of ', cnt, ' attacks'
    pprint(dict(attacktype))
    pprint(dict(targettype))

 
    #TODO: deal with matplotlib install (libpng drama)
    """   
    wordcloud = WordCloud(#font_path=,
                      relative_scaling = 1.0,
                      stopwords = STOPWORDS #'to of'
                      ).generate(summarytext)	## Or motivetext

    plt.imshow(wordcloud)
    plt.axis("off")
    plt.show()
    """

def check_groups(file_name):
    for row in read_csv(file_name):
        gnames = ['gname', 'gname2', 'gname3']
        gsubnames = ['gsubname', 'gsubname2', 'gsubname3']

        if any([row[gname] for gname in gnames]) and any([row[gsubname] for gsubname in gsubnames]):
            for gname in gnames + gsubnames: 
                print row[gname],
            print  



if __name__ == '__main__': 
    file_name = sys.argv[1]

    country_name = 'Bulgaria' 		# 'Netherlands', 'Syria', 'Afghanistan'

    get_basic_stuffs(file_name, country_name)
#    check_groups(file_name)


