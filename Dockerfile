FROM openjdk:11.0-jdk-slim-buster as builder

COPY ./java /app/java
RUN javac /app/java/recorder.java

FROM openjdk:11.0-jre-slim-buster

WORKDIR /app/java

COPY --from=builder /app/java/recorder.class recorder.class


ENTRYPOINT [ "java", "recorder" ]