FROM openjdk:8
RUN mkdir /opt/housie-service
WORKDIR /opt/housie-service
COPY ./target/housie-service-0.0.4-SNAPSHOT.jar .
COPY run-housie-service.sh .
ENTRYPOINT ./run-housie-service.sh
