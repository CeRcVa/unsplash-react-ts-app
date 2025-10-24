# ---------- Builder stage ----------
FROM node:18-alpine AS builder
WORKDIR /app

# copy package manifest first (cache benefit)
COPY package.json package-lock.json ./

# install deps (use npm ci if package-lock.json exists)
RUN npm ci

# copy the rest
COPY . .

# provide access key at build time (ARG) and expose it as ENV for the build step
ARG VITE_UNSPLASH_ACCESS_KEY
ENV VITE_UNSPLASH_ACCESS_KEY=${VITE_UNSPLASH_ACCESS_KEY}

# build the app (Vite will inline import.meta.env values at build time)
RUN npm run build

# ---------- Production stage (nginx static) ----------
FROM nginx:stable-alpine AS production
# remove default nginx content (optional)
RUN rm -rf /usr/share/nginx/html/*

# copy built dist from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# copy a custom nginx config (optional but recommended for SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
