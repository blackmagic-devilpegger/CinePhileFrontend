## BUILD Stage ##
FROM gradle:jdk21-jammy AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src

# Argumente für Umgebungsvariablen (optional, falls benötigt)
ARG DB_PASSWORD
ARG DB_URL
ARG DB_USER

# Gradle-Build ausführen
RUN gradle build --no-daemon


## PACKAGE Stage ##
FROM eclipse-temurin:21-jdk-jammy
COPY --from=build /home/gradle/src/build/libs/CinePhile-0.0.1-SNAPSHOT.jar app.jar

# Startpunkt für die Ausführung der Anwendung
ENTRYPOINT ["java", "-jar", "/app.jar"]
