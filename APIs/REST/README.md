# Overview
## Description
This demo utilizes a REST API built with Express and Mongoose for query processing. It provides endpoints for reading, creating, updating and deleting records.
## Requirements
### Commands
```
$ npm init -y
$ npm i express mongoose
$ npm i --save-dev dotenv nodemon
$ npm run devStart
```
### VSCode Extension
REST Client by Huachao Mao
## Definitions
| **Term** | **Description** | **Example** |
| - | - | - |
| **Endpoint** | Where API requests are sent to | http//localhost:1234/path |
| **Model** | An object that adheres to the **Schema** interface | A person record requiring name and age as input as instructed by the schema |
| **Schema** | Defines record structure |  ***Attributes of person:***
|||- **name:** `{ type: String, required: true }`|
|||- **age:** `{ type: Number, required: true }`|
## Note: CRUD -> REST
CREATE -> POST\
READ -> GET\
UPDATE -> PUT/PATCH\
DELETE -> DELETE
