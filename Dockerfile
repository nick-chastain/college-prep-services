# Frontend build stage
FROM node:20-alpine as frontend-build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Backend build stage
FROM node:20-alpine as backend-build

WORKDIR /app/server

COPY server/package*.json ./
RUN npm install

COPY server ./
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy frontend build
COPY --from=frontend-build /app/dist ./dist

# Copy backend build
COPY --from=backend-build /app/server/dist ./dist/server
COPY --from=backend-build /app/server/package*.json ./

# Install production dependencies
RUN npm install --production

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"] 