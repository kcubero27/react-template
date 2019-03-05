FROM node:10.5

RUN apt-get update
RUN apt-get install -y vim

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . /usr/src/app

ENTRYPOINT ["tail", "-f", "/dev/null"]