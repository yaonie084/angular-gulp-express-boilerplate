FROM daocloud.io/yaonie084/kkk

MAINTAINER ethan <yaonie084@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

EXPOSE 8080

# Configure

RUN rm -rf /opt/angular-gulp-express-boilerplate

RUN cd /opt && git clone https://github.com/yaonie084/angular-gulp-express-boilerplate.git

RUN cp -rf /opt/bak/node_modules/ /opt/angular-gulp-express-boilerplate/

RUN cp -rf /opt/bak/bower_components/ /opt/angular-gulp-express-boilerplate/

WORKDIR /opt/angular-gulp-express-boilerplate

# Installation

RUN npm install

RUN bower install --allow-root

# Run server

RUN gulp

CMD ["node", "server/app.js"]