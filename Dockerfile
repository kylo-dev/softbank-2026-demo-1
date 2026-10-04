FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --chown=node:node . .
RUN npm run build
USER node
EXPOSE 3000
CMD ["node", "index.js"]
