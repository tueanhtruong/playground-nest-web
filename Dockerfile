# Base image
FROM node:20-alpine AS builder

# ARG DATABASE_URL
# ENV DATABASE_URL=$DATABASE_URL
# ARG JWT_SECRET
# ENV JWT_SECRET=$JWT_SECRET
# ARG API_KEY
# ENV API_KEY=$API_KEY
# ARG WEATHER_API_KEY
# ENV WEATHER_API_KEY=$WEATHER_API_KEY
# ARG WEATHER_API_URL
# ENV WEATHER_API_URL=$WEATHER_API_URL

RUN apk add --no-cache libc6-compat
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./
# Copy app source
COPY packages/eslint-config-custom-server ./packages/eslint-config-custom-server
COPY packages/jest-presets ./packages/jest-presets
COPY packages/logger ./packages/logger
COPY packages/tsconfig ./packages/tsconfig
COPY apps/api ./apps/api
# Install app dependencies
RUN pnpm install --frozen-lockfile

# Creates a "dist" folder with the production build
RUN pnpm run build

# Start the server using the production build
CMD [ "pnpm", "run", "start:api" ]
