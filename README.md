# node.js-clean-architecture
A use case of Clean Architecture in Node.js

## Overview
This example is a simple CRUD API application in which a user can create / delete / find a post, by using the *Clean Architecture*.

The objective of *Clean Architecture* by [Robert C. Martin] is the separation of concerns in software. 
This separation is achieved by dividing the software into layers. Each layer is encapsulated by a higher level layer and the way to communicate between the layers is with the *Dependency Rule*.

![](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

### Dependency Rule
This rule says that nothing in an inner circle can know anything at all about something in an outer circle. The dependency direction is from the outside in. Meaning that the *Entities* layer is independent and the *Frameworks & Drivers* layer (Web, UI, DB etc.) depends on all the other layers.
### Entities
Contains all the business entities an application consists of. In our example the *User* and the *Post*.
### Use Cases
Contains application specific business rules. These use cases orchestrate the flow of data to and from the entities. In our example some of the use cases are: add post, add user, delete post, delete user etc.
### Interface Adapters
This layer is a set of adapters (controllers, presenters, and gateways) that convert data from the format most convenient for the use cases and entities, to the format most convenient for some external agency such as the DB or the Web. In other words, is an entry and exit points to the Use Cases layer. In our example we implemented controllers and presenters together and these are the PostController and the UserController.
### Frameworks and Drivers
The outermost layer is generally composed of frameworks and tools such as the Database, the Web Framework, etc.

[Robert C. Martin]: <https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html>
   
   
