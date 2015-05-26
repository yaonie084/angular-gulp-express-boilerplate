FROM yaonie084/node

MAINTAINER ethan <yaonie084@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

EXPOSE 8080

### Installation

RUN apt-get install wget

RUN cd /opt/angular-gulp-express-boilerplate/config && wget http://7u2o75.com1.z0.glb.clouddn.com/angular-gulp_config.json.png -O config.json

RUN cd /opt/angular-gulp-express-boilerplate && npm install

RUN cd /opt/angular-gulp-express-boilerplate && sequelize --env=production db:migrate

# Add config file

RUN cd /opt/angular-gulp-express-boilerplate && bower install --allow-root

# Run server

RUN cd /opt/angular-gulp-express-boilerplate && gulp

CMD cd /opt/angular-gulp-express-boilerplate && NODE_ENV=production node server/app.js