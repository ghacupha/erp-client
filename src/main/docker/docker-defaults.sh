#!/usr/bin/env sh
set -eu

# Implementation of image configurations based on:
# https://stackoverflow.com/a/65529290/10330809
# As of version 1.19, the official Nginx Docker image supports templates with
# variable substitution. But that uses `envsubst`, which does not allow for
# defaults for missing variables. Here, first use the regular command shell
# to set the defaults:
export SERVER_API_DOCKER_DEPLOY_URL=${SERVER_API_DOCKER_DEPLOY_URL:-http://localhost:8980}

# envsubst '${SERVER_API_DOCKER_DEPLOY_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# cat /etc/nginx/conf.d/default.conf

# Due to `set -u` this would fail if not defined and no default was set above
echo "Requests proxy configured for /* to ${SERVER_API_DOCKER_DEPLOY_URL}/*"

# Finally, let the original Nginx entry point do its work, passing whatever is
# set for CMD. Use `exec` to replace the current process, to trap any signals
# (like Ctrl+C) that Docker may send it:
exec /docker-entrypoint.sh "$@"
