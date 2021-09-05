FROM node:14.17.1

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build


# CMD ["npm", "run", "dev"]