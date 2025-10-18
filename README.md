# Project Title: CPUT-Student-Housing-Connect

#Problem Description

The Cape Peninsula University of Technology (CPUT) is facing severe student accommodation crisis with thousands of students each year struggling to secure housing. This growing issue is not just logistical challenge, it directly impacts students’ academic performance and overall well-being.

•	Objective: Develop a digital platform to help reduce the number of students arriving at CPUT without accommodation.


## Configuration

The application expects database credentials to be supplied through environment variables when running locally or in production:

| Variable | Description | Default |
| --- | --- | --- |
| `MYSQL_HOST` | Hostname for the MySQL server. | `localhost` |
| `MYSQL_USER` | Username for the database connection. | `root` |
| `MYSQL_PASSWORD` | Password for the database connection. | _(empty)_ |

Spring Boot will automatically read these values from your environment (e.g., terminal session, Docker container, or deployment platform). You can also override them in a profile-specific properties file if required.

For convenience, an example configuration file is provided at `src/main/resources/application-example.properties`. Copy this file to `application.properties` (or use it as a reference) and update the values with your local credentials when you do not want to rely on environment variables.

### Handling port conflicts

The application listens on port **8080** by default. If that port is already taken when the server
starts, the application now automatically falls back to the first available port and logs a warning
message similar to:

```
Configured port 8080 is already in use. Falling back to available port 54321.
```

Check the log output after startup to determine which port the application finally bound to, or set
`SERVER_PORT`/`server.port` explicitly to force a specific port when required.
