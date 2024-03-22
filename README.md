# SwapCars

## [Ver la web](https://swapcars.netlify.app/)

![App Logo](./logo.png)

## Description

**-** Proyecto para venta y compra coches de segunda mano 

#### [Client Repo](https://github.com/AdriPriego/swapcars-client)
#### [Server Repo](https://github.com/AdriPriego/swapcars-server)

## Backlog Functionalities

**-** Ver los Coches que tienes publicados

## Technologies used

**-** Express,axios, React Context middlewares etc.

# Server Structure

## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  location: {type: String, required: true},
  favs: [{type: Schema.Types.ObjectId,ref:'Car'}]
}
```

Car model

```javascript
 {
   name: {type: String, required: true},
   model: {type: String, required: true  enum: ["Toyota", "Ford", "Seat", "Suzuki", "Renault", "Tesla", "Mercedes", "Ferrari", "Volkswagen", "Nissan", "Bmw", "Audi", "Skoda"]},
   category: {type: String, required: true enum: ["Suv", "Cabrio", "4x4", "Coupe", "Berlina", "Pick-Up"]},
   year: {type: Number, required: true}
   cv: {type: Number, required: true},
   km: {type: Number, required: true},
   price: {type: Number, required: true},
   imageUrl: {type: String, required: true},
   description: {type: String, required: true},
   userCar: {type: Schema.Types.ObjectId,ref:'User'},
 }
```

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/auth/signup`              | {name, email, location, password}      | 201            | 400          | Registers the user in the Database                             |
| POST        | `/auth/login`               | {email, password}         | 200            | 400          | Validates credentials, creates and sends Token                 |
| GET         | `/auth/verify`              |                              | 200            | 401          | Verifies the user Token                                        |
| GET         | `/cars`                     |                              | 200            | 400          | Show car in the DB, only titles and images                   |
| POST        | `/cars`                     |                       | 201            | 400          | Creates a new car Document                                    |
| GET         | `/car/:carId`             |                              | 200            | 400, 401     | Sends all car Details                                         |
| PUT         | `/car/:carId`             |                              | 200            | 400, 401     | Edits car document                                            |
| DELETE      | `/car/:carId`             |                              | 200            | 401          | Deletes car document                                          |                                  |                                      |
| PATCH       | `/userId/:carId`          |                              | 200            | 401          | Adds car to favourite                                         |                              |                                |
| POST        | `/questions/:carId`                     |                       | 201            | 400          | Creates a new question car Document                                    |
| GET         | `/question/:carId`             |                              | 200            | 400, 401     | Sends all questions care Details                                         |
| PUT         | `/:questionId`             |                              | 200            | 400, 401     | Edits question document                                            |
| DELETE      | `/:questionId`             |                              | 200            | 401          | Deletes question document  
## Links

### Collaborators

[Developer 1 name](https://github.com/AdriPriego)


### Project

#### [Client Repo](https://github.com/AdriPriego/swapcars-client)
#### [Server Repo](https://github.com/AdriPriego/swapcars-server)

[Deploy Link](https://swapcars.netlify.app/)

### Slides

[Slides Link](https://www.canva.com/design/DAGAOpug_Ho/j6rLYouJnl_3SG1CxER0uA/view?utm_content=DAGAOpug_Ho&utm_campaign=designshare&utm_medium=link&utm_source=editor)