<div align="center">
  <img src="./assets/node-logo.svg"/>
</div>

<h1 align = "center">Challenge: Task List CRUD</h1>

<p>Developed as a straightforward yet robust project, the application presents a comprehensive CRUD (Create, Read, Update, Delete) system designed to manage a task list via APIs implemented in Node.js. This project facilitates seamless interaction with the application's core functionality by enabling users to employ HTTP requests routed through dedicated endpoints.</p>

<p>Built upon a foundation of pure Node.js architecture, this project seamlessly integrates the "csv-parse" library to parse and transform CSV files into structured objects.</p>

<div align="center">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <img src="https://img.shields.io/static/v1?label=node&message=v18.7.1&color=blue&style=plastic&logo="/>
  </div>
</div>

<h4 align="center"> 
	NodeJS Fundamentals | Status: Done ✔️
</h4>

## Table of Contents

- [Features](#features)
- [Requirements to run the project](#requirements-to-run-the-project)
- [Running the application](#running-the-application)
- [Main Technologies](#main-technologies)
- [License](#license)
- [Author](#author)

## Features

This API offers some endpoints to make CRUD operations on the local JSON Database. Besides, POST and PUT routes have sent data validation to ensure that both title and description properties are being sent.

### GET (/tasks)

Return the list of tasks included in the database. For example: GET http://localhost:3333/tasks

### POST (/tasks)

Send the data of the task through JSON body request.

Try sending this JSON format bellow to: POST http://localhost:3333/tasks

```json
{
  "title": "my task",
  "description": "my task description"
}
```

### PUT (/tasks/:id)

Update some task by informing its ID through the route param.

Try altering the description of a given task: PUT http://localhost:3333/tasks/2f157520-4eb0-4f5a-839b-3c4e6953589f. Don't forget to send the title and/or the description modified.

```json
{
  "title": "my task",
  "description": "my task description changed"
}
```

### DELETE (/tasks/:id)

Delete a task with an ID informed on route param. For example: DELETE http://localhost:3333/tasks/2f157520-4eb0-4f5a-839b-3c4e6953589f.

### PATCH (/tasks/:id/complete)

Mark as complete a task sending its ID through route param, like: PATCH http://localhost:3333/tasks/2f157520-4eb0-4f5a-839b-3c4e6953589f/complete.

### POST (/tasks/import)

Convert text in CSV file into a JavaScript Object and send the data to the database through the API route. Try sending a request like: POST http://localhost:3333/tasks/import.

<span>In the root project, there's a file named "tasks.csv" with this text:</span>

```csv
title,description
Task 01,Descrição da Task 01
Task 02,Descrição da Task 02
Task 03,Descrição da Task 03
Task 04,Descrição da Task 04
Task 05,Descrição da Task 05
```

## Requirements to run the project

<p>Before you run the project, check if you have [Node.js](https://nodejs.org/en/) installed on your machine, as well [Git](https://git-scm.com) to clone this repository.</p>

## Running the application

```bash
    # Clone this repository on your machine:
    $ git clone https://github.com/vitorlinsbinski/task-list-crud.git

    # Access the project folder in your terminal:
    $ cd task-list-crud

    # Install all dependencies:
    $ npm install

    # Run the application:
    $ node src/server.js
```

<p>After that, you may use some API Client to send HTTP requests to the server, like Insomnia.</p>

## Main Technologies

- [NodeJS](https://nodejs.org/)

## License

This project is licensed under [MIT](https://choosealicense.com/licenses/mit/) License.

### Author

<a href="https://github.com/vitorlinsbinski">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/69444717?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Vitor Linsbinski</b></sub></a> <a href="https://github.com/vitorlinsbinski" title="">🚀</a>

Developed by Vitor Linsbinski

[![Linkedin Badge](https://img.shields.io/badge/-Vitor-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/vitorlinsbinski/)](https://www.linkedin.com/in/vitorlinsbinski/)
