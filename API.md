# Hacker Assessor API

#### URL
/hackers

#### Method
GET

#### Data Params
None

#### Success Response
* Code: 200
* Content:
```
[ { name: "Jorge", id: "1" }, { name: "Rodrigo", id: "2" } ]
```
___

#### URL
/hackers/:id/acquirements

#### Method
GET

#### Data Params
None

#### Success Response
* Code: 200
* Content:
```
[ { name: "TDD", description: "Cool description", id: "1" },
  { name: "JavaScript", description: "Cool description", id: "2" } ]
```

#### Notes
**TODO**: Add the level that the hacker know about each skill.
___

#### URL
/hackers/:id/acquirements

#### Method
POST

#### Data Params
```
{ "acquirements": [ { "skill": "1" }, { "skill": "2" } ] }
```

#### Success Response
* Code: 201
* Content: None
___

#### URL
/hackers/:id/seniorities

#### Method
GET

#### Data Params
None

#### Success Response
* Code: 200
* Content: TODO. Return a list of seniorities to reach by a hacker.
___

#### URL
/hackers/:id/seniorities/:id

#### Method
GET

#### Data Params
None

#### Success Response
* Code: 200
* Content: TODO. Return the requirements to reach a seniority.
___

#### URL
/seniorities

#### Method
GET

#### Data Params
None

#### Success Response
* Code: 200
* Content:
```
[ { name: "Senior Frontend", id: "1" }, { name: "Full Stack", id: "2" } ]
```
___

#### URL
/seniorities

#### Method
POST

#### Data Params
```
{ "seniority": { "name": "Senior Ruby" } }
```

#### Success Response
* Code: 201
* Content: None
___

#### URL
/seniorities/:id/requirements

#### Method
GET

#### Data Params
None

#### Success Response
* Code: 200
* Content:
```
[ { name: "TDD", description: "Cool description", id: "1" },
  { name: "JavaScript", description: "Cool description", id: "2" } ]
```

#### Notes
**TODO**: Add the level that is required for a specific seniority.
___

#### URL
/seniorities/:id/requirements

#### Method
POST

#### Data Params
```
{ "requirements": [ { "skill": "1" }, { "skill": "2" } ] }
```

#### Success Response
* Code: 201
* Content: None
___

#### URL
/skill

#### Method
GET

#### Data Params
None

#### Success Response
* Code: 200
* Content:
```
[ { name: "TDD", description: "Cool description", id: "1" },
  { name: "Scrum", description: "Cool description", id: "2" } ]
```
___

#### URL
/seniorities

#### Method
POST

#### Data Params
```
{ "skill": { "name": "Time Traveler", "description": "The best way to travel" } }
```

#### Success Response
* Code: 201
* Content: None
___

#### URL
/skill/:id

#### Method
GET

#### Data Params
None

#### Success Response
* Code: 200
* Content:
```
{ name: "TDD", description: "Cool description" }
```
