FROM node:16.14.0-alpine3.15

WORKDIR /app/

COPY dist/. /app/dist/

EXPOSE 80

CMD ["node", "dist/goblog-admin-web/server/main.js"]
