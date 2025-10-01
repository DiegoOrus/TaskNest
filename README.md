# TaskNest

A full-stack task management application built with React and Spring Boot, featuring user authentication, personalized task lists, and real-time synchronization.

## Features

- **User Authentication**: Secure JWT-based authentication system
- **Personal Task Lists**: Each user has their own isolated task list
- **Task Management**: Create, edit, delete, and mark tasks as complete
- **Favorites**: Mark important tasks as favorites for priority sorting
- **Custom List Titles**: Each user can personalize their list title
- **Search Functionality**: Quickly find tasks with real-time search
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Modern, eye-friendly dark interface

## Tech Stack

### Frontend
- **React** (18.x) - UI framework
- **Axios** - HTTP client for API requests
- **React Icons** - Icon library
- **CSS3** - Custom styling with animations

### Backend
- **Spring Boot** (3.x) - Application framework
- **Spring Security** - Authentication and authorization
- **JWT** (JSON Web Tokens) - Stateless authentication
- **JPA/Hibernate** - Database ORM
- **MySQL** - Relational database
- **Lombok** - Boilerplate code reduction

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Java** (JDK 17 or higher)
- **Maven** (3.6 or higher)
- **MySQL** (8.0 or higher)

## Installation

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE tasknest;
```

2. Update database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/tasknest
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### Backend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd TaskNest
```

2. Build and run the Spring Boot application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Project Structure

```
TaskNest/
├── src/
│   ├── main/
│   │   ├── java/com/project/TaskNest/
│   │   │   ├── config/
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── ItemController.java
│   │   │   │   └── UserController.java
│   │   │   ├── dto/
│   │   │   │   ├── AuthRequest.java
│   │   │   │   ├── AuthResponse.java
│   │   │   │   └── RegisterRequest.java
│   │   │   ├── model/
│   │   │   │   ├── Items.java
│   │   │   │   └── User.java
│   │   │   ├── repo/
│   │   │   │   ├── ItemRepo.java
│   │   │   │   └── UserRepo.java
│   │   │   ├── security/
│   │   │   │   ├── CustomUserDetailsService.java
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   └── JwtUtil.java
│   │   │   └── TaskNestApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ActiveCount.jsx
│   │   │   ├── AddItem.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Item.jsx
│   │   │   ├── ItemList.jsx
│   │   │   ├── List.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── SearchItem.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── pom.xml
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/validate` - Validate JWT token

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/list-title` - Update list title

### Items
- `GET /api/items` - Get all user items
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update item
- `DELETE /api/items/{id}` - Delete item
- `POST /api/items/reorder` - Get reordered items

## Security Features

- **JWT Authentication**: Stateless authentication using JSON Web Tokens
- **Password Encryption**: BCrypt password hashing
- **CORS Configuration**: Configured for frontend origin
- **User Isolation**: Each user can only access their own data
- **Token Validation**: Automatic token validation on protected routes

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    list_title VARCHAR(255) DEFAULT 'list',
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Items Table
```sql
CREATE TABLE items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    checked BOOLEAN DEFAULT FALSE,
    favourite BOOLEAN DEFAULT FALSE,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Usage

1. **Register**: Create a new account with username, email, and password
2. **Login**: Sign in with your credentials
3. **Add Tasks**: Use the input field to add new tasks
4. **Manage Tasks**: 
   - Click checkbox to mark as complete
   - Click star icon to mark as favorite
   - Click edit icon to modify task text
   - Click trash icon to delete task
5. **Search**: Use the search bar to filter tasks
6. **Customize**: Click the edit icon next to the list title to personalize it
7. **Logout**: Click the logout button to end your session

## Configuration

### JWT Configuration
Update JWT settings in `application.properties`:
```properties
jwt.secret=your-secret-key-here
jwt.expiration=86400000
```

### CORS Configuration
Update allowed origins in `SecurityConfig.java`:
```java
configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
```

## Development

### Running Tests
```bash
mvn test
```

### Building for Production

Backend:
```bash
mvn clean package
java -jar target/TaskNest-0.0.1-SNAPSHOT.jar
```

Frontend:
```bash
npm run build
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check database credentials in application.properties
   - Ensure database exists

2. **CORS Error**
   - Verify frontend URL in SecurityConfig.java matches your dev server
   - Check that backend is running on port 8080

3. **JWT Token Issues**
   - Clear localStorage in browser
   - Re-login to get new token
   - Check token expiration settings

4. **Items Not Showing**
   - Verify user_id column exists in items table
   - Check browser console for errors
   - Verify authentication token is valid

## Future Enhancements

- Task categories/tags
- Due dates and reminders
- Task sharing and collaboration
- File attachments
- Dark/Light theme toggle
- Export tasks to CSV/PDF
- Mobile app (React Native)

## License

This project is licensed under the MIT License.

## Contributors

- Your Name - Initial work

## Acknowledgments

- React Icons for the icon library
- Spring Boot community for excellent documentation
- JWT.io for JWT implementation resources

  
<img width="783" height="838" alt="Screenshot 2025-10-02 051332" src="https://github.com/user-attachments/assets/8ca863f2-c3d8-4ffb-ab7b-c2066554ae5f" />
<img width="604" height="940" alt="Screenshot 2025-10-02 051403" src="https://github.com/user-attachments/assets/c9b089ab-3cba-423e-945a-1ee0679529e5" />
<img width="1908" height="960" alt="Screenshot 2025-10-02 051501" src="https://github.com/user-attachments/assets/f7a976b1-c12a-4842-8ee3-226dc394b962" />
