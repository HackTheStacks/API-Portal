import requests
import json
import math
import os

def get_dspace(entity):
    uri = "https://digitallibrary.amnh.org/rest/{}".format(entity)
    return requests.get(uri, verify=False)

def get_stuff(entity, directory):
    response = get_dspace(entity)
    data = json.loads(response.content)
    for datum in data:
        id = datum['id']
        path = '{}/{}.json'.format(directory, id)
        with open(path, 'w+') as f:
            js_data = json.dumps(datum)
            f.write(js_data)

def get_all(entity):
    directory = 'dspace/data/{}'.format(entity)
    if not os.path.exists(directory):
        os.makedirs(directory)
    get_stuff(entity, directory)
