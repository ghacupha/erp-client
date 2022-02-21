#
# ERP System - ERP data management platform
# Copyright © 2021 Edwin Njeru (mailnjeru@gmail.com)
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.
#

# Stage 1
# FROM node:14.18-alpine3.12 AS compile-image
FROM gmathieu/node-browsers:3.0.0 AS compile-image

COPY package.json /usr/angular-workdir/
COPY .npmrc /usr/angular-workdir/
WORKDIR /usr/angular-workdir/
RUN npm install

COPY ./ /usr/angular-workdir/

RUN npm run build

FROM nginx:1.15.8-alpine

## Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY src/main/docker/nginx/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /usr/angular-workdir//target/classes/static /usr/share/nginx/html

RUN echo "mainFileName=\"\$(ls /usr/share/nginx/html/main*.js)\" && \
          envsubst '\$SERVER_API_URL \$DEFAULT_LANGUAGE ' < \${mainFileName} > main.tmp && \
          mv main.tmp  \${mainFileName} && nginx -g 'daemon off;'" > run.sh

ENTRYPOINT ["sh", "run.sh"]
