omeka_key = ''
per_page = 50

import requests
import json
import math
import os

def get_omeka(entity, page):
    uri = "http://lbry-web-007.amnh.org/digital/api/{}/?key={}&page={}".format(entity, omeka_key, page)
    return requests.get(uri)

def get_stuff(entity, page, directory):
    response = get_omeka(entity, page)
    data = json.loads(response.content)
    for datum in data:
        id = datum['id']
        path = '{}/{}.json'.format(directory, id)
        with open(path, 'w+') as f:
            js_data = json.dumps(datum)
            f.write(js_data)

def get_total(entity):
    response = get_omeka(entity, 0)
    total = response.headers['Omeka-Total-Results']
    pages = math.ceil(int(total) / 50)
    return pages

# I think there is an off by one error
def get_all(entity):
    pages = get_total(entity)
    directory = 'omeka/data/{}'.format(entity)
    if not os.path.exists(directory):
        os.makedirs(directory)
    for page in range(int(pages)):
        get_stuff(entity, page, directory)
        print page / pages
