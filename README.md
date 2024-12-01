Technology Stack: Node.js, Express, Postgres & SequelizeORM, REST APIs



API Endpoints:
Demo result:
Signup:
http://localhost:3000/api/v1/auth/signup/

{
 "userType": "1",
 "firstName": "John",
 "lastName": "Doe",
 "email": "test@012gmail.com",
 "password": "test12345",
 "confirmedPassword": "test12345"
}

{
    "status": "success",
    "data": {
        "id": 20,
        "userType": "1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "test@012gmail.com",
        "updatedAt": "2024-12-01T17:41:10.644Z",
        "createdAt": "2024-12-01T17:41:10.644Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTczMzA3NDg3MCwiZXhwIjoxNzQwODUwODcwfQ.crHHzPZ4NYCA7kAhdcEoUmwdIQtCyDpjBfQ_pvrak-A"
    }
}


==================================
Login:
http://localhost:3000/api/v1/auth/login/

{
 "email": "test@gmail.com",
 "password": "test1"
}

{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzMDc0NjEwLCJleHAiOjE3NDA4NTA2MTB9.DQSXOHoEuNTWc0Mz1gJu2mz13qZ0so-RUuSw2x_rPIU"
}
