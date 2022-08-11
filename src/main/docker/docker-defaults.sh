#!/usr/bin/env sh
set -eu

# Implementation of image configurations based on:
# https://stackoverflow.com/a/65529290/10330809
# As of version 1.19, the official Nginx Docker image supports templates with
# variable substitution. But that uses `envsubst`, which does not allow for
# defaults for missing variables. Here, first use the regular command shell
# to set the defaults:
export SERVER_API_DOCKER_DEPLOY_URL=${SERVER_API_DOCKER_DEPLOY_URL:-http://localhost:8980}

# Due to `set -u` this would fail if not defined and no default was set above
echo "Will proxy requests for /* to ${SERVER_API_DOCKER_DEPLOY_URL}/* \\n\\n"

echo "Systems check, reviewing initial nginx configuration script....\\n\\n"

initialFile='/etc/nginx/conf.d/default.temp.conf'
n=1
while read line; do
# reading each line
echo "Line No. $n : $line"
n=$((n+1))
done < $initialFile

echo "\\n\\n Configuration script complete! Initializing environment-variable substitution... \\n\\n"


# Running envsubst
# envsubst '$${SERVER_API_DOCKER_DEPLOY_URL}' < /etc/nginx/conf.d/default.temp.conf > /etc/nginx/conf.d/default.conf

echo "\\n\\n Systems check, reviewing compiled nginx configuration script....\\n\\n"

filename='/etc/nginx/conf.d/default.conf'
n=1
while read line; do
# reading each line
echo "Line No. $n : $line"
n=$((n+1))
done < $filename

echo "\\n\\n If the API variable you may ignore the message. Interrupt the process if the SERVER_API is misconfigured..."


# Finally, let the original Nginx entry point do its work, passing whatever is
# set for CMD. Use `exec` to replace the current process, to trap any signals
# (like Ctrl+C) that Docker may send it:
exec /docker-entrypoint.sh "$@"
