FROM node:20-alpine

WORKDIR /app

# Копіюємо тільки package files спочатку (кешування шарів)
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів
COPY . .

EXPOSE 3000 3001

CMD ["npm", "run", "dev"]
