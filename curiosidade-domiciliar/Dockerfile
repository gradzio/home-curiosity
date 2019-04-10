FROM nginx:1.13.3-alpine
COPY ./server/nginx.conf /etc/nginx/conf.d/default.conf
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY /dist/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]