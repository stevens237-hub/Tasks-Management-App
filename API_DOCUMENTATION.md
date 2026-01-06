# EasyTasks API Documentation

Documentation complète de l'API EasyTasks pour tests dans Postman.

**Base URL :** `http://localhost:5000`   
**Auteur :** Steve Mboda Nguenang

---

Base de toute requête postman: `http://localhost:5000`

##  Authentication

### 1. Register User

**Créer un nouveau compte utilisateur**

**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Login User

**Se connecter et obtenir un token**

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

**Important :** Copiez le `token` pour l'utiliser dans les autres requêtes !

---

### 3. Logout User

**Request:**
```http
POST /api/auth/logout
Authorization: Bearer YOUR_TOKEN
```

### 4. Get User Profile

**Request:**
```http
GET /api/auth/profile
Authorization: Bearer YOUR_TOKEN
```

---

### 5. Update User Profile

**Request:**
```http
PUT /api/auth/profile
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

---

## Tasks Management

### 6. Create Task

**Créer une nouvelle tâche**

**Request:**
```http
POST /api/tasks/create
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Développer la page login",
  "stage": "todo",
  "priority": "high",
  "date": "2024-12-25",
  "assets": ["https://example.com/mockup.png"]
}
```

**Fields:**
- `title` *(required)* : Titre de la tâche
- `stage` *(optional)* : `todo` | `in progress` | `completed` (default: `todo`)
- `priority` *(optional)* : `high` | `medium` | `normal` | `low` (default: `normal`)
- `date` *(optional)* : Date au format ISO (default: date actuelle)
- `assets` *(optional)* : Tableau d'URLs

---

### 7. Get All Tasks

**Récupérer toutes les tâches avec filtres optionnels**

**Request:**
```http
GET /api/tasks?stage=todo&isTrashed=false
Authorization: Bearer YOUR_TOKEN
```

**Query Parameters:**
- `stage` *(optional)* : `todo` | `in progress` | `completed`
- `isTrashed` *(optional)* : `true` | `false` (default: `false`)

**Examples:**
```
GET /api/tasks                              → Toutes les tâches actives
GET /api/tasks?stage=todo                   → Tâches "todo"
GET /api/tasks?stage=in progress            → Tâches "in progress"
GET /api/tasks?isTrashed=true               → Tâches dans la corbeille
```

---

### 8. Get Single Task

**Request:**
```http
GET /api/tasks/67591a8b3c4d5e6f7a8b9c0d
Authorization: Bearer YOUR_TOKEN
```

**Success Response (200):**
```json
{
  "status": true,
  "task": {
    "_id": "67591a8b3c4d5e6f7a8b9c0d",
    "title": "Développer la page login",
    "stage": "in progress",
    "priority": "high",
    ...
  }
}
```

---

### 9. Update Task

**Request:**
```http
PUT /api/tasks/update/67591a8b3c4d5e6f7a8b9c0d
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Nouveau titre",
  "stage": "in progress",
  "priority": "medium"
}
```
**Note:** Tous les champs sont optionnels

---

### 10. Move Task to Trash

**Request:**
```http
PUT /api/tasks/trash/67591a8b3c4d5e6f7a8b9c0d
Authorization: Bearer YOUR_TOKEN
```

---

### 11. Delete Task Permanently

**Request:**
```http
DELETE /api/tasks/delete-restore/67591a8b3c4d5e6f7a8b9c0d?actionType=delete
Authorization: Bearer YOUR_TOKEN
```

---

### 12. Restore Task from Trash

**Request:**
```http
DELETE /api/tasks/delete-restore/67591a8b3c4d5e6f7a8b9c0d?actionType=restore
Authorization: Bearer YOUR_TOKEN
```

---

### 13. Delete All Trashed Tasks

**Request:**
```http
DELETE /api/tasks/delete-restore?actionType=deleteAll
Authorization: Bearer YOUR_TOKEN
```

---

### 14. Restore All Trashed Tasks

**Request:**
```http
DELETE /api/tasks/delete-restore?actionType=restoreAll
Authorization: Bearer YOUR_TOKEN
```

---

### 15. Create SubTask

**Request:**
```http
PUT /api/tasks/create-subtask/67591a8b3c4d5e6f7a8b9c0d
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Créer le formulaire de connexion",
  "tag": "Frontend",
  "date": "2024-12-20"
}
```

**Fields:**
- `title` *(required)* : Titre de la sous-tâche
- `tag` *(optional)* : Catégorie/tag
- `date` *(optional)* : Date

---

### 16. Post Task Activity

**Request:**
```http
POST /api/tasks/activity/67591a8b3c4d5e6f7a8b9c0d
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "type": "started",
  "activity": "J'ai commencé à travailler sur cette tâche"
}
```

**Fields:**
- `type` *(optional)* : `assigned` | `started` | `in progress` | `bug` | `completed` | `commented` (default: `commented`)
- `activity` *(required)* : Texte de l'activité

---

##  Workflow de test

1. **Register** → Obtenir token
2. **Create Task** → Obtenir ID
3. **Add Activity** → Type "started"
4. **Update Task** → Stage "in progress"
5. **Add SubTask** → Ajouter détails
6. **Update Task** → Stage "completed"
7. **Trash Task** → Soft delete
8. **Restore** → Récupérer

