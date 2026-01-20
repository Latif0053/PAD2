# Tahap 1: Build Vue
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Terima variabel dari docker-compose
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build aplikasi (Vite akan memasukkan ENV ke dalam hasil build)
RUN npm run build

# Tahap 2: Serve dengan Nginx (Sesuai konsep praktikum)
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Salin config Nginx kustom kita
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]