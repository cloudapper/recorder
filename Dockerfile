FROM openjdk:11.0-jdk-slim-buster as builder

COPY ./java /app/java
RUN javac /app/java/recorder.java

FROM openjdk:11.0-jre-slim-buster

COPY --from=builder /app/java /app/java

WORKDIR /app/java

ENTRYPOINT [ "java", "recorder.class" ]