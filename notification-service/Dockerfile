# 1. Start with a base image (Java 21 since you are using it)
FROM eclipse-temurin:21-jdk-alpine

# 2. Set the working directory
WORKDIR /app

# 3. Copy the jar file (after you run mvn clean package)
COPY target/*.jar app.jar

# 4. Expose the port
EXPOSE 8082

# 5. Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]