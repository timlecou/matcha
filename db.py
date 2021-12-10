import json
import random
import requests


headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}

nb = random.randint(0, 100)
# Data to be written
data ={
    "username": "clucien",
    "email": "clucien@student.42.fr",
    "password": "password",
    "birth_date": "2001-04-20T00:00:00.000Z",
    "last_sign_in": "2021-11-25T00:00:00.000Z",
    "latitude": "45.435423",
    "longitude": "42.54333",
    "gender": "M",
    "sexual_orientation": "F",
    "online": "false",
    "biography": "salut la zone wesh",
    "score": 97,
    "first_name": "Clement",
    "last_name": "Lucien",
    "activated": "false"
}

data1 ={
    "username": "timlecou",
    "email": "timlecou@student.42.fr",
    "password": "password",
    "birth_date": "2001-04-20T00:00:00.000Z",
    "last_sign_in": "2021-11-25T00:00:00.000Z",
    "latitude": "45.435423",
    "longitude": "42.54333",
    "gender": "M",
    "sexual_orientation": "F",
    "online": "false",
    "biography": "timlecou wawawa",
    "score": 97,
    "first_name": "Timothe",
    "last_name": "Lecouvreur",
    "activated": "false"
}
  
# Serializing json 
json_object = json.dumps(data, indent = 4)

#sending the request to create a user
requests.post('http://localhost:4000/users', data=json_object, headers=headers)