# Base image
FROM node:20-alpine AS builder

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

ENV PORT 3000
EXPOSE 3000

# Start the server using the production build
CMD [ "pnpm", "run", "start:api" ]
