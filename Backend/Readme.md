# Evava (Backend)
This document is the backend part for testing purpose that is made as required.



### api/task

| API                            | Request  | Usage                                              |
| ------------------------------ | -------  | -------------------------------------------------- |
| `api/task/getTask?taskid=`     | GET      | Get a Task by id                                   |
| `api/task/updateTask?taskid=`  | PUT      | Update from existed Task by id                     |
| `api/task/createTask`          | POST     | Create new Task                                    |
| `api/task/deleteTask?taskid=`  | DELETE   | Delete a Task with an id                           |       |
              



#### Request body (api/task)
{
    "title": "Hi there",
    "description": "Here is description for your task ",
    "solution": "",
    "finish": false,
}



#### Success response (api/task)
{
    "data": {
        "status": "success",
        "docs": {
            "description": "H20",
            "solution": "",
            "finish": false,
            "_id": "5e9d9eda41b0c225f7d40ff8",
            "title": "Hi there",
            "created_at": "2020-04-20T13:08:42.323Z",
            "updated_at": "2020-04-20T13:08:42.323Z",
            "__v": 0
        }
    }
}


### Task schema

| Attributes        | Type    | Required | Default |
| ----------------- | ------- | -------- | ------- |
| `title`           | String  | Yes      | primary |
| `description`     | String  | No       | ''      |
| `solution`        | String  | No       | ''      |
| `finish`          | Boolean | No       | false   |




### Project with Nodejs, Mongo DB, Typscript, Express, Mocha , Chai
1./ Init the Project   : npm install
2./ Start DB           : npm run db
3./ Start Project      : npm start




### Unit Test with Mocha und chai
To run unit test 
1./ Start DB                              : npm run db
2./ Open new Terminal and start testing   : npm test
