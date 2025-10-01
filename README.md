# TaskNest Backend 📝

A robust RESTful API backend for TaskNest - a modern task management application built with Spring Boot and PostgreSQL.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

TaskNest Backend provides a complete REST API for managing tasks with features like priority ordering, favorites, and task completion tracking. Built with Spring Boot 3.x and leveraging modern Java features, this backend ensures scalability, maintainability, and performance.

## ✨ Features

- **CRUD Operations**: Complete Create, Read, Update, and Delete operations for tasks
- **Smart Sorting**: Automatic task ordering by priority (Favorites → Unchecked → Checked)
- **Favorite Tasks**: Mark important tasks as favorites for quick access
- **Task Completion**: Track completed tasks with checkbox functionality
- **RESTful Architecture**: Clean and intuitive API design
- **PostgreSQL Integration**: Robust and reliable data persistence
- **CORS Enabled**: Seamless integration with frontend applications
- **Auto-Generated IDs**: Sequential ID management for tasks

## 🛠️ Technology Stack

- **Framework**: Spring Boot 3.5.3
- **Language**: Java 21
- **Build Tool**: Maven
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA / Hibernate
- **Additional Libraries**:
  - Lombok (Code generation)
  - PostgreSQL JDBC Driver

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK)**: Version 21 or higher
  - [Download JDK](https://www.oracle.com/java/technologies/downloads/)
- **Maven**: Version 3.6 or higher
  - [Download Maven](https://maven.apache.org/download.cgi)
- **PostgreSQL**: Version 12 or higher
  - [Download PostgreSQL](https://www.postgresql.org/download/)
- **IDE** (Optional but recommended):
  - IntelliJ IDEA
  - Eclipse
  - VS Code with Java extensions

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sumitmadaan16/tasknest-backend.git
cd tasknest-backend
```

### 2. Set Up PostgreSQL Database

Open PostgreSQL command line or pgAdmin and create a new database:

```sql
CREATE DATABASE TaskNest;
```

### 3. Configure Database Connection

Create an `application.properties` file from the sample template:

```bash
# Navigate to resources folder
cd src/main/resources

# Copy the sample file
cp application-sample.properties application.properties
```

Update the newly created `application.properties` file with your PostgreSQL credentials:

```properties
spring.datasource.username=your_postgres_username
spring.datasource.password=your_postgres_password
```

**Note**: The `application.properties` file is gitignored for security. Always use `application-sample.properties` as a template.

### 4. Install Dependencies

```bash
mvn clean install
```

## ⚙️ Configuration

### application.properties

The repository includes `application-sample.properties` as a template. Create your own `application.properties` from this sample:

```properties
# Application Name
spring.application.name=TaskNest

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/TaskNest
spring.datasource.username=postgres
spring.datasource.password=your_password

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Server Configuration (Optional)
# server.port=8080
```

**Important**: 
- Never commit `application.properties` with sensitive credentials
- Always use `application-sample.properties` as a reference
- Add `application.properties` to `.gitignore`

### Configuration Options Explained

- **`spring.jpa.hibernate.ddl-auto=update`**: Automatically updates database schema based on entity changes
- **`spring.jpa.show-sql=true`**: Logs SQL queries to console for debugging
- **Database URL**: Modify if using different host/port for PostgreSQL

## 🔌 API Endpoints

### Base URL
```
http://localhost:8080/api/items
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/items` | Get all tasks (sorted by priority) | - |
| `POST` | `/api/items` | Create a new task | Task JSON |
| `PUT` | `/api/items/{id}` | Update an existing task | Task JSON |
| `DELETE` | `/api/items/{id}` | Delete a task by ID | - |
| `POST` | `/api/items/reorder` | Reorder tasks by priority | - |

### Request/Response Examples

#### Get All Tasks
```http
GET /api/items
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "checked": false,
    "favourite": true
  },
  {
    "id": 2,
    "title": "Review pull requests",
    "checked": false,
    "favourite": false
  }
]
```

#### Create a New Task
```http
POST /api/items
Content-Type: application/json

{
  "title": "Buy groceries",
  "checked": false,
  "favourite": false
}
```

**Response:**
```json
{
  "id": 3,
  "title": "Buy groceries",
  "checked": false,
  "favourite": false
}
```

#### Update a Task
```http
PUT /api/items/1
Content-Type: application/json

{
  "title": "Complete project documentation",
  "checked": true,
  "favourite": true
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "checked": true,
  "favourite": true
}
```

#### Delete a Task
```http
DELETE /api/items/1
```

**Response:** `204 No Content`

## 🗄️ Database Schema

### Items Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| `title` | VARCHAR(255) | NOT NULL | Task title/description |
| `checked` | BOOLEAN | DEFAULT false | Completion status |
| `favourite` | BOOLEAN | DEFAULT false | Favorite status |

### Task Ordering Logic

Tasks are automatically sorted using the following priority:

1. **Favorite tasks** (favourite = true) - Highest priority
2. **Unchecked tasks** (checked = false) - Medium priority
3. **Checked tasks** (checked = true) - Lowest priority
4. **ID** (ascending) - Tie-breaker

This is implemented via the custom query:
```sql
SELECT i FROM Items i ORDER BY i.favourite DESC, i.checked ASC, i.id ASC
```

## 🏃 Running the Application

### Option 1: Using Maven

```bash
mvn spring-boot:run
```

### Option 2: Using Java

```bash
# Build the project
mvn clean package

# Run the JAR file
java -jar target/TaskNest-Backend-0.0.1-SNAPSHOT.jar
```

### Option 3: Using IDE

1. Open the project in your IDE
2. Navigate to `TaskNestApplication.java`
3. Right-click and select "Run"

### Verify Installation

Once the application starts, you should see:

```
Started TaskNestApplication in X.XXX seconds
```

Test the API:
```bash
curl http://localhost:8080/api/items
```

## 📁 Project Structure

```
tasknest-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── project/
│   │   │           └── TaskNest/
│   │   │               ├── TaskNestApplication.java
│   │   │               ├── controller/
│   │   │               │   └── ItemController.java
│   │   │               ├── model/
│   │   │               │   └── Items.java
│   │   │               └── repo/
│   │   │                   └── ItemRepo.java
│   │   └── resources/
│   │       ├── application-sample.properties
│   │       └── application.properties (gitignored)
│   └── test/
├── .gitignore
├── pom.xml
└── README.md
```

### Key Components

- **`TaskNestApplication.java`**: Main Spring Boot application class
- **`ItemController.java`**: REST controller handling HTTP requests
- **`Items.java`**: Entity class representing task model
- **`ItemRepo.java`**: JPA repository interface for database operations
- **`application-sample.properties`**: Configuration template (safe to commit)
- **`application.properties`**: Actual configuration (gitignored)

## 🧪 Testing the API

### Using cURL

```bash
# Get all tasks
curl -X GET http://localhost:8080/api/items

# Create a task
curl -X POST http://localhost:8080/api/items \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","checked":false,"favourite":false}'

# Update a task
curl -X PUT http://localhost:8080/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task","checked":true,"favourite":true}'

# Delete a task
curl -X DELETE http://localhost:8080/api/items/1
```

### Using Postman

1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:8080`
3. Add appropriate headers and request bodies
4. Test each endpoint

## 🔧 Troubleshooting

### Common Issues

**Issue**: `Unable to connect to database`
- **Solution**: Ensure PostgreSQL is running and credentials in `application.properties` are correct

**Issue**: `Port 8080 already in use`
- **Solution**: Change the port in `application.properties`:
  ```properties
  server.port=8081
  ```

**Issue**: `Lombok not working`
- **Solution**: Enable annotation processing in your IDE
  - IntelliJ: Settings → Build → Compiler → Annotation Processors → Enable

**Issue**: `CORS errors from frontend`
- **Solution**: Update the `@CrossOrigin` annotation in `ItemController.java` with your frontend URL

**Issue**: `application.properties not found`
- **Solution**: Create `application.properties` from `application-sample.properties` template

## 🔐 Security Note

**⚠️ Important**: This version does NOT include authentication or authorization. All endpoints are publicly accessible. For production use, implement:

- Spring Security
- JWT Authentication
- Input validation
- Rate limiting
- HTTPS

### Configuration Files Security

- The repository includes `application-sample.properties` instead of `application.properties`
- Never commit sensitive credentials to version control
- Always create your own `application.properties` from the sample file
- Ensure `application.properties` is in your `.gitignore`

## 🚧 Future Enhancements

- [ ] User authentication and authorization
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Task search and filtering
- [ ] Pagination for large datasets
- [ ] Task sharing and collaboration
- [ ] File attachments
- [ ] Task history/audit log

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sumit Madaan**
- GitHub: [@sumitmadaan16](https://github.com/sumitmadaan16)

## 🙏 Acknowledgments

- Spring Boot documentation
- PostgreSQL community
- Stack Overflow community

---

**Built with ❤️ using Spring Boot**
