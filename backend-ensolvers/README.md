# NODE + Express backend API

### Endpoints

Base url (usually run in PORT:3000):
```
http://localhost:3000/api/v1
```
All this routes are after the base URL.

#### Auth

```
POST /auth/register
POST /auth/login
```

#### Folder
```
GET /folder
POST /folder
```

#### Task
```
POST /folder/:id/task
GET /folder/:id/task
GET DEL PUT /task/:id
PUT /task/:id/done
```
