FROM nginx:1.25-alpine3.17-slim

# Copying the files from the local directory to the docker container.
COPY ./conf/keys/ /etc/letsencrypt/live/pokedex.io/
COPY ./conf/nginx/ /etc/nginx/
COPY ./src/ /opt/pokedex/

# Exposing port 443 for https and port 80 for http
EXPOSE 443
EXPOSE 80
