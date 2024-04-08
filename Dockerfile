FROM node:18-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build
FROM nginx
COPY --from=build /app/dist/blog-livres/ /usr/share/nginx/html
EXPOSE 80
