# FROM node:8.10.0-alpine as builder
# COPY package.json ./
# # RUN npm install && mkdir /curiosidade-domiciliar && mv ./node_modules ./curiosidade-domiciliar
# WORKDIR /curiosidade-domiciliar
# COPY . .
# # RUN npm run build --prod --build-optimizer
# FROM nginx:1.13.9-alpine
# COPY ./server/nginx.conf /etc/nginx/conf.d/default.conf
                                  
# # RUN rm -rf /usr/share/nginx/html/*
# # COPY --from=builder /curiosidade-domiciliar/dist /usr/share/nginx/html
# # COPY --from=builder /curiosidade-domiciliar/server/entrypoint.sh /usr/share/nginx/
# # RUN chmod +x /usr/share/nginx/entrypoint.sh
# # ENTRYPOINT ["/docker-entrypoint.sh"]
# # CMD ["/bin/sh", "/usr/share/nginx/entrypoint.sh"]
FROM nginx:1.13.3-alpine
COPY ./server/nginx.conf /etc/nginx/conf.d/default.conf
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY /dist/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]