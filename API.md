# Hacker Assessor API

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
[ { name: "Senior Frontend", id: "1" }, { name: "TDD", id: "2" } ]
```
___

#### URL
/seniorities

#### Method
POST

#### Data Params
```
{ "seniority": { "name": "Seniro Ruby" } }
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
[ { level: "3", seniority_id: "1", skill_id: "1", id: "1" },
  { level: "2", seniority_id: "1", skill_id: "3", id: "1" } ]
```

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
{ "skill": { "name": "Time Travel", "description": "The best wat to travel" } }
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
