FROM node:14-alpine as builder
WORKDIR /src
COPY . .
RUN npm install
RUN npm ci
RUN npm run build
RUN mkdir build
RUN mv package.json package-lock.json next.config.js i18n.js .next src/pages public locales ./build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /src/build .
RUN npm ci --production --no-audit
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
