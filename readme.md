# GG3.0 Tokopedia Play Clone (Server)
[![GitHub stars](https://img.shields.io/github/stars/nyxsr/gg-tokopedia-play-repl-be)](https://github.com/nyxsr/gg-tokopedia-play-repl-be/stargazers)



## Documentation 📖
* [About](#what-is-this--)
* [Installation](#how-to-use--)
* [Database Structure](#database-structure-)
* [API Structure](#api-structure-)

## What is this ? 👋


This is a Backend for Tokopedia Play Replication and it's made with many tools, like :
* [ExpressJS](https://expressjs.com/)
* [Mongoose](https://mongoosejs.com/) (For MongoDB Connectors)
* [Socket.IO](https://socket.io/) (For Realtime Communication with Frontend)
* [JWT](https://github.com/auth0/node-jsonwebtoken)
* and many more...

## How to Use ? 🤔
To preview this website locally :
1. Install [NodeJS](https://nodejs.org/) and [MongoDB](https://mongodb.com/)
2. Clone this repository first
```
$ git clone https://github.com/expressjs/expressjs.com.git
```
3. Install the depedency for install the node_modules
```
$ npm install
```
4. Set up your `.env` file , just duplicate the `.env.example` and rename into `.env`. Don't forget to fill out the `.env` with corrected data.
5. Lastly, you need to run the server and **make sure** you are **connected to the internet**
```
$ npm run dev
```
5. You can access the server now with terminal using _curl_, [Postman](https://postman.com), [Insomnia](https://insomnia.rest), etc

Congratulations! 🎉🎉🎉

## Database Structure 🦴

This project using [MongoDB](https://mongodb.com) as a Database so in other words , we use NoSQL and the structure gonna be collections and documents.


### Users Collection
The `user` collection stores information about users and their profiles.

| Field             | Type       | Description                                 |
| ----------------- | ---------- | ------------------------------------------- |
| `_id`             | ObjectId   | Unique identifier for the user              |
| `name`            | String     | Full name of the user                       |
| `username`        | String     | Unique username for the user                |
| `password`        | String     | Password for the user's account             |
| `isOfficialStore` | Boolean    | Indicates if the user is an official store |
| `createdAt`       | Date       | Timestamp of when the user was created     |
| `updatedAt`       | Date       | Timestamp of when the user was last updated |


### Guest Collection
The `guest` collection stores information about guest users.

| Field       | Type     | Description                             |
| ----------- | -------- | --------------------------------------- |
| `_id`       | ObjectId | Unique identifier for the guest user    |
| `username`  | String   | Username of the guest user              |
| `createdAt` | Date     | Timestamp of when the guest user was created |
| `updatedAt` | Date     | Timestamp of when the guest user was last updated |

### Products Collection
The `product` collection stores information about products.

| Field         | Type                     | Description                              |
| ------------- | ------------------------ | ---------------------------------------- |
| `_id`         | ObjectId                 | Unique identifier for the product        |
| `title`       | String (required)        | Title of the product                     |
| `url`         | String (required)        | URL of the product                       |
| `urlThumbnail`| String (required)        | URL of the product thumbnail image       |
| `price`       | Number (required)        | Price of the product                     |
| `createdBy`   | ObjectId (ref: user)     | ID of the user who created the product   |
| `createdAt`   | Date                     | Timestamp of when the product was created|
| `updatedAt`   | Date                     | Timestamp of when the product was last updated |

### Videos Collection

The `video` collection stores information about videos and their associated metadata.

| Field          | Type                          | Description                               |
| -------------- | ----------------------------- | ----------------------------------------- |
| `_id`          | ObjectId                      | Unique identifier for the video           |
| `title`        | String (required)             | Title of the video                        |
| `urlThumbnail` | String (required)             | URL of the video thumbnail image          |
| `src`          | String (required)             | Link to the video content                 |
| `creator`      | ObjectId (ref: user, required) | ID of the user who created the video      |
| `videoCategory`| ObjectId (ref: videoCategory)  | ID of the video category (optional)       |
| `dealsCategory`| ObjectId (ref: dealsCategory)  | ID of the deals category (optional)       |
| `isOnlyLive`   | Boolean (default: false)      | Indicates if the video is only available live |
| `comments`     | Array of ObjectId (ref: comment)| Array of comment IDs associated with the video |
| `createdAt`    | Date                          | Timestamp of when the video was created   |
| `updatedAt`    | Date                          | Timestamp of when the video was last updated |

### Comments Collection
The `comment` collection stores information about comments made by users.

| Field       | Type     | Description                             |
| ----------- | -------- | --------------------------------------- |
| `_id`       | ObjectId | Unique identifier for the comment       |
| `username`  | String   | Username of the user who made the comment |
| `comment`   | String   | Content of the user's comment           |
| `createdAt` | Date     | Timestamp of when the comment was created |
| `updatedAt` | Date     | Timestamp of when the comment was last updated |

### Video Category Collection

The `videoCategory` collection stores information about video categories.

| Field         | Type                  | Description                                  |
| ------------- | --------------------- | -------------------------------------------- |
| `_id`         | ObjectId              | Unique identifier for the video category     |
| `name`        | String (required)     | Name of the video category                   |
| `createdAt`   | Date                  | Timestamp of when the video category was created |
| `updatedAt`   | Date                  | Timestamp of when the video category was last updated |

### Deals Category Collection

The `dealsCategory` collection stores information about deals categories.

| Field         | Type                  | Description                                     |
| ------------- | --------------------- | ----------------------------------------------- |
| `_id`         | ObjectId              | Unique identifier for the deals category        |
| `name`        | String (required)     | Name of the deals category                      |
| `kind`        | String (enum: 'promo', 'rilis', required) | Kind of the deals category (Promo or Rilis) |
| `createdAt`   | Date                  | Timestamp of when the deals category was created |
| `updatedAt`   | Date                  | Timestamp of when the deals category was last updated |

## API Structure 🧠

### Base URL 
```
http://localhost:3000/api/
```
### Endpoints

**Description**: Endpoints for do authorization and granting access to the website/server.

### 1. Auth

| Endpoint                     | Method | Description                            | Request Body                     | Response Body                         |
|------------------------------|--------|----------------------------------------|----------------------------------|---------------------------------------|
| `/auth/login`                     | POST    | Grant access to the website/server.                         | username and password                                | Array of user objects.                |



### 2. Users

**Description**: Endpoints for managing users.

| Endpoint                     | Method | Description                            | Request Body                     | Response Body                         |
|------------------------------|--------|----------------------------------------|----------------------------------|---------------------------------------|
| `/users`                     | GET    | Get all users.                         | -                                | Array of user objects.                |
| `/users/:id`                 | GET    | Get a specific user by ID.             | -                                | User object.                          |
| `/users`                     | POST   | Create a new user.                     | User object with name, username and password . | User object with ID.                  |
| `/users/:id`                 | PUT    | Update an existing user.               | User object with updated fields. | User object with updated fields.       |
| `/users/:id`                 | DELETE | Delete a user.| - | - |

### 3. Guest

**Description**: Endpoints for managing users.

| Endpoint                     | Method | Description                            | Request Body                     | Response Body                         |
|------------------------------|--------|----------------------------------------|----------------------------------|---------------------------------------|
| `/users`                     | GET    | Get all users.                         | -                                | Array of user objects.                |
| `/users/:id`                 | GET    | Get a specific user by ID.             | -                                | User object.                          |
| `/users`                     | POST   | Create a new user.                     | User object with name, username and password . | User object with ID.                  |
| `/users/:id`                 | PUT    | Update an existing user.               | User object with updated fields. | User object with updated fields.       |
| `/users/:id`                 | DELETE | Delete a user.| - | - |

### 4. Products

**Description**: Endpoints for managing products.

| Endpoint                     | Method | Description                            | Request Body                     | Response Body                         |
|------------------------------|--------|----------------------------------------|----------------------------------|---------------------------------------|
| `/products`                     | GET    | Get all products.                         | -                                | Array of product objects.                |
| `/products/:id`                 | GET    | Get a specific product by ID.             | -                                | User object.                          |
| `/products`                     | POST   | Create a new product.                     | Product object with title, url, price and ID of the product creator. | Product object with ID.                  |
| `/products/:id`                 | PUT    | Update an existing product.               | Product object with updated fields. | Product object with updated fields.       |
| `/products/:id`                 | DELETE | Delete a product.| - | - |

### 5. Videos

**Description**: Endpoints for managing videos.

| Endpoint                     | Method | Description                            | Request Body                     | Response Body                         |
|------------------------------|--------|----------------------------------------|----------------------------------|---------------------------------------|
| `/videos`                     | GET    | Get all videos.                         | -                                | Array of video objects.                |
| `/videos/:id`                 | GET    | Get a specific video by ID.             | -                                | Video object.                          |
| `/videos`                     | POST   | Create a new video.                     | Product object with title, urlThumbnail,and ID of the video creator. | Video object with ID.                  |
| `/videos/:id`                 | PUT    | Update an existing video.               | Video object with updated fields. | Video object with updated fields.       |
| `/videos/:id`                 | DELETE | Delete a video.| - | - |

### 6. Comments

**Description**: Endpoints for managing comments.

| Endpoint                     | Method | Description                            | Request Body                     | Response Body                         |
|------------------------------|--------|----------------------------------------|----------------------------------|---------------------------------------|
| `/comments`                     | GET    | Get all comments.                         | -                                | Array of comment objects.                |
| `/comments/:id`                 | GET    | Get a specific comment by ID.             | -                                | Comment object.                          |
| `/comments`                     | POST   | Create a new comment.                     | Product object with title, urlThumbnail,and ID of the comment creator. | Comment object with ID.                  |
| `/comments/:id`                 | PUT    | Update an existing comment.               | Comment object with updated fields. | Comment object with updated fields.       |
| `/comments/:id`                 | DELETE | Delete a comment.| - | - |

### Sample Endpoint Usage

### 1. Login
**Endpoint** : `/auth/login`

**Method** : `POST`

**Description** : Granting access to the website/server

**Example Request**:

```sql
POST /auth/login/
```

**Example Request Body**:

```json
{
    "username":"your_username",
    "password":"your_password"
}
```

**Example Response**:

```json
{
    "meta": {
        "code": 200,
        "message": "Berhasil Login!"
    },
    "data": {
        "user": {
            "_id": "64be8a55f27b4c39ebf48c36",
            "name": "Sahrul Ramdan",
            "username": "nyxsr",
            "isOfficialStore":false
            "createdAt": "2023-07-24T14:27:33.585Z",
            "updatedAt": "2023-07-24T14:27:33.585Z",
            "__v": 0
        },
        "token": <your_secret_token>
    }
}
```
### 2. Create a User
**Endpoint** : `/users/`

**Method** : `POST`

**Description** : Create an user for accessing the website/server

**Example Request**:

```sql
POST /
```

**Example Request Body**:

```json
{
    "name":"John Doe",
    "username":"johndoe",
    "password":"astrongpassword"
}
```

**Example Response**:

```json
{
    "meta": {
        "code": 201,
        "message": "Data berhasil dibuat"
    },
    "data": {
        "name": "John Doe",
        "username": "johndoe",
        "password": <hashed_password>,
        "_id": "64c09448f801823ab691e2cb",
        "createdAt": "2023-07-26T03:34:32.235Z",
        "updatedAt": "2023-07-26T03:34:32.235Z",
        "__v": 0
    }
}
```

### 3. Get all users
**Endpoint** : `/users/`

**Method** : `GET`

**Description** : Create an user for accessing the website/server

**Example Request**:

```sql
GET /
Authorization : Bearer <your_secret_token>
```

**Example Response**:

```json
{
    "meta": {
        "code": 200,
        "message": "Data User ditemukan"
    },
    "data": [
        {
            "_id": "64c09448f801823ab691e2cb",
            "name": "John Doe",
            "username": "johndoe",
            "password": "<hashed_password>",
            "createdAt": "2023-07-24T14:27:33.585Z",
            "updatedAt": "2023-07-24T14:27:33.585Z",
            "__v": 0
        },
    ]
}
```

### 4. Get all products
**Endpoint** : `/products/`

**Method** : `GET`

**Description** : Get all products

**Example Request**:

```sql
GET /
Authorization : Bearer <your_secret_token>
```

**Example Response**:

```json
{
    "meta": {
        "code": 200,
        "message": "Data Product ditemukan"
    },
    "data": [
        {
            "_id": "64c09c98aeb5edf0218e499f",
            "title": "USAMS U71 Kabel Data Fast Charging All in one 100W PD/QC/AFC/FCP 1.2M",
            "url": "https://www.tokopedia.com/usamsidofficial/usams-u71-kabel-data-fast-charging-all-in-one-100w-pd-qc-afc-fcp-1-2m?src=topads&source=homepage.top_carousel.0.38456",
            "price": 150000,
            "createdBy": "64be8a55f27b4c39ebf48c36",
            "createdAt": "2023-07-26T04:10:00.323Z",
            "updatedAt": "2023-07-26T04:10:39.169Z",
            "__v": 0
        }
    ]
}
```

### 5. Get all videos
**Endpoint** : `/videos/`

**Query** : `videoCategory=<videoCategory_Name>`

**Method** : `GET`

**Description** : Get all videos

**Example Request**:

```sql
GET /
Authorization : Bearer <your_secret_token>
```

**Example Response**:

```json
{
    "meta": {
        "code": 200,
        "message": "Data Video ditemukan"
    },
    "data": [
        {
            "_id": "64c09dccc7895aeb25870a60",
            "title": "QTAR QTIR!! Bakso ini dipercaya disukai Oppenheimer semasa hidupnya",
            "urlThumbnail": "https://awsimages.detik.net.id/community/media/visual/2022/03/12/bakso-nuklir-di-jombang_169.jpeg?w=620",
            "creator": "64be8a55f27b4c39ebf48c36",
            "createdAt": "2023-07-26T04:15:08.041Z",
            "updatedAt": "2023-07-26T04:15:53.656Z",
            "__v": 0
        }
    ]
}
```

### 6. Get all comments
**Endpoint** : `/comments/`

**Method** : `GET`

**Description** : Get all comments

**Example Request**:

```sql
GET /
Authorization : Bearer <your_secret_token>
```

**Example Response**:

```json
{
    "meta": {
        "code": 200,
        "message": "Data Comment ditemukan"
    },
    "data": [
        {
            "_id": "64c09e915a67d4dd2ff1dfd5",
            "username": "nyxsr",
            "comment": "Mamah aku takut!",
            "createdAt": "2023-07-26T04:18:25.161Z",
            "updatedAt": "2023-07-26T04:18:46.655Z",
            "__v": 0
        }
    ]
}
```

## Creator

Sahrul Ramdan a.k.a [@nyxsr](https://github.com/nyxsr)

