# node.js-clean-architecture
A use case of Clean Architecture in Node.js comprising of Express.js, MongoDB and Redis as the main (but replaceable) infrastructure.

## Overview
This example is a simple RESTful API application in which a user can create / update / delete / find a post, by using the *Clean Architecture*.

The objective of *Clean Architecture* by [Robert C. Martin] is the separation of concerns in software. 
This separation is achieved by dividing the software into layers. Each layer is encapsulated by a higher level layer and the way to communicate between the layers is with the *Dependency Rule*.

![](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

### Dependency Rule
This rule says that nothing in an inner circle can know anything at all about something in an outer circle. The dependency direction is from the outside in. Meaning that the *Entities* layer is independent and the *Frameworks & Drivers* layer (Web, UI, DB etc.) depends on all the other layers.
### Entities
Contains all the business entities an application consists of. In our example the *User* and the *Post*.
### Use Cases
Contains application specific business rules. These use cases orchestrate the flow of data to and from the entities. In our example some of the use cases are: *AddPost*, *AddUser*, *DeleteById* etc.
### Interface Adapters
This layer is a set of adapters (controllers, presenters, and gateways) that convert data from the format most convenient for the use cases and entities, to the format most convenient for some external agency such as the DB or the Web. In other words, is an entry and exit points to the Use Cases layer. In our example we implemented controllers and presenters together and these are the PostController and the UserController.
### Frameworks and Drivers
The outermost layer is generally composed of frameworks and tools such as the Database, the Web Framework, etc.
## How to run it
* Make sure you have [mongoDB] installed. At the terminal run the following command:
```sh
mongod --dbpath <path_to_data/db_folder>
```
* Make sure [Redis] is also installed and running.<br /><br />
* Run the server in development mode by typing the following command:
```sh
npm run dev
```
* Run the server in production mode by typing the following command:
```sh
npm run start
```

## How to run it (using Docker)
* Make sure you have [docker] installed. At the root folder run the following command:
```sh
docker-compose up -d
```
## How to test it
* In order to make sure the app is up and running try to add a user using the following command:
```sh
curl --data "username=randomUserName&password=randomPassword&email=randomUser@123.com" http://localhost:1234/api/v1/users
```
* You should get as a response:
```sh
"user added"
```

## Further reading
- https://roystack.home.blog/2019/10/22/node-clean-architecture-deep-dive/
- https://mannhowie.com/clean-architecture-node

[Robert C. Martin]: <https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html>
[docker]: <https://www.docker.com/>  
[mongoDB]: <https://www.mongodb.com/try/download/community>
[Redis]: <https://redis.io/download>
   
   
