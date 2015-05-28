FROM yaonie084/angular_express

MAINTAINER ethan <yaonie084@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

EXPOSE 8080

WORKDIR /opt/angular-gulp-express-boilerplate

# Installation
RUN git pull

RUN npm install

RUN bower install --allow-root

# Run server

RUN gulp

CMD ["node", "server/app.js"]