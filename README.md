## Connecting to the API

You can connect to the API portal at the following *internal* url:

    http://10.20.40.218:3000/<ROUTE>

You must be on the HackTheStacks network to connect to the URL.

Substitute <ROUTE> with pne of the routes listed below.

# API Portal
### /api/v1/people
```json
[
  {
    "name": "Abbott, Charles G.",
    "id": "amnhp_1000001"
  },
  {
    "name": "Abbott, Clinton G. (Clinton Gilbert), 1881-1946",
    "id": "amnhp_1000002"
  }
]
```
**Note**: All APIs support filtering via query params. Ex:
**/api/vi/people?name=Abbott, Charles G.**

### /api/v1/people/:id
```json
{
  "id": "amnhp_1000001",
  "description": "Secretary of Smithsonian Institution, astrophysicist",
  "existDates": {
    "start": -3079540800000,
    "end": 124952400000
  },
  "name": {
    "first": "Charles G",
    "last": "Abbott"
  }
}
```

### /api/v1/expeditions
```json
[
  {
    "name": "(Bahamas 1887)",
    "id": "amnhc_2000001"
  },
  {
    "name": "Elliott-Richardson Expedition to Montana",
    "id": "amnhc_2000002"
  }
]
```

### /api/v1/expeditions/:id
```json
{
  "id": "amnhc_2000001",
  "description": "Sources: Nothing found in Annual Reports for  85-86, 86-87, 87-88; nor in Library Exped. Vertical files.  Only reference is in this spreadsheet",
  "date": "1887",
  "place": "Bahamas",
  "name": "(Bahamas 1887)"
}
```

### /api/v1/departments
```json
[
  {
    "name": "American Museum of Natural History. Department of Animal Behavior",
    "id": "amnhc_3000001"
  },
  {
    "name": "American Museum of Natural History. Department of Experimental Biology",
    "id": "amnhc_3000002"
  }
]
```

### /api/v1/departments/:id
#### Under Construction

### /api/v1/exhibitions
```json
[
  {
    "name": "What America is Doing for Western Asia and North Africa through the Syrian Protestant College",
    "permanent": false,
    "id": "amnhc_5000001"
  },
  {
    "name": "Illustrating the Cotton-Boll Weevil",
    "permanent": false,
    "id": "amnhc_5000002"
  }
]
```

### /api/v1/exhibitions/:id
```json
{
  "id": "amnhc_4000078",
  "description": [
    "The Milstein Hall of Advanced Mammals features extinct mammal relatives such as mammoths, mastodons, saber-toothed cats, camels, and giant ground sloths, which roamed North America until about 10,000 years ago. These species became extinct, possibly due to climate changes at the end of the last ice age, hunting by humans, and infectious disease.",
    "This hall also includes mammals with such modern traits as the hoof, a stirrup-shaped ear bone, and eye sockets near the snout, as well as traits found in primitive mammals: the synapsid opening in the skull, three middle ear bones, and the placenta. Among the animals represented are bats, rodents, rabbits, cats, seals, bears, primates, deer, horses, whales, and elephants. (source: AMNH website, accessed October 18, 2016)",
    "Information for the hall appears in the following museum publications:",
    "American Museum of Natural History Annual Reports from years\n\t\t\t\t\t1993 (page 81); 1994 (page 5)",
    "American Museum of Natural History Original Guides for years\n\t\t\t\t\t1993 (page 50); \n\t\t\t\t\t2001 (page 50)",
    "American Museum of Natural History Floor Plan, Summer 2012"
  ],
  "abstract": "Current hall. Opened June 1994. The Paul and Irma Milstein Hall of Advanced Mammals is one of two halls in the Lila Acheson Wallace Wing of Mammals and Their Extinct Relatives, which together tell of the great diversification and sudden extinctions of this group of animals. The roots of the mammalian line reach back almost 300 million years, but the mammals featured in this hall, including both primitive and advanced species, arose after the extinction of the non-avian dinosaurs.",
  "place": "AMNH: Floor 4, Section 3.",
  "names": [
    {
      "name": "Paul and Irma Milstein Hall of Advanced Mammals."
    },
    {
      "name": "Paul and Irma Milstein Hall of Advanced Mammals",
      "dates": [
        "1993",
        "1994",
        "2001"
      ]
    },
    {
      "name": "Advanced Mammals",
      "dates": "1993"
    },
    {
      "name": "Milstein Hall of Advanced Mammals",
      "dates": "2012"
    }
  ]
}
```
**NOTE** - Only permanent exhibitions have an available detailed view

## xEac

- people: amnhp_1
- expedition: amnhc_2
- department: amnhc_3
- hall: amnhc_4

## Contributing
To start the server:

> **npm start**

*OR*

> **npm install -g pm2**

> **pm2 start npm --name "HackathonAPI" -- start --watch**

Make a GET request to any of the end points.
[Postman](https://www.getpostman.com/) works well for testing.

