# Base image
FROM node:20-alpine AS builder

# ARG DATABASE_URL

ARG BUILD_TYPE

ENV BUILD_TYPE=${BUILD_TYPE}

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
COPY apps/storefront ./apps/storefront
# Install app dependencies

# Creates a "dist" folder with the production build
# RUN pnpm install --frozen-lockfile

RUN if [ "$BUILD_TYPE" = "api" ]; then \
        pnpm install --frozen-lockfile; \
        pnpm run build:api; \
    elif [ "$BUILD_TYPE" = "web" ]; then \
        pnpm install --frozen-lockfile; \
        pnpm run build:web; \
    else \
        echo "No valid build type specified"; \
        exit 1; \
    fi

# Start the server using the production build
CMD pnpm run start:"$BUILD_TYPE"