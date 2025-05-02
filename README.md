# 🚀 Bull Queue + Redis + TypeScript + Cron + Dashboard

Este projeto é uma API em Node.js com TypeScript, que usa Bull para gerenciamento de filas, Redis como broker, `node-cron` para agendamento periódico e Bull Board para visualização de jobs.

---

## 📦 Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Bull (v3)
- Redis
- Docker + Docker Compose
- node-cron
- Bull Board (Dashboard UI)

---

## 📁 Estrutura do Projeto

```
.
├── index.ts                 # Entry principal (inicia server, workers, crons)
├── server.ts                # Configuração e startup do Express
├── src/
│   ├── configs/             # Redis, Bull, envs, dashboard
│   ├── controllers/         # Handlers HTTP
│   ├── crons/               # Tarefas periódicas com node-cron
│   ├── middleware/          # Middlewares como autenticação e logger
│   ├── models/              # Tipagens
│   ├── routes/              # Rotas agrupadas
│   ├── services/            # Lógica de negócio
│   └── workers/             # Processadores de filas
```

---

## 🚀 Como Rodar

### ▶️ Usando Docker (recomendado)

```bash
# Copie o .env de exemplo
cp .env.example .env

# Suba os containers com build
docker-compose up --build

# rodar a api via docker
docker-compose up

```

Acesse:
- API: [http://localhost:3000](http://localhost:3000)
- Dashboard: [http://localhost:3000/admin/queues](http://localhost:3000/admin/queues)

---

## ⏱ Cron configurado

- Expressão definida no `.env` com a variável `EXAMPLE_CRON`
- Exemplo: `*/10 * * * *` → roda a cada 10 minutos
- Cria um job `example-task` na fila `exampleQueue`

---

## 🧾 Exemplo de Worker com Rate Limit

A fila `exampleQueue` está configurada para aceitar **no máximo 10 jobs por segundo**:

```ts
export const exampleQueue = new Bull('exampleQueue', {
  redis: redisConfig,
  limiter: {
    max: 10,
    duration: 1000,
  },
  defaultJobOptions: {
    removeOnComplete: {
      age: 240,
      count: 100,
    },
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
  },
});
```

---

## 📊 Bull Board UI

- Interface gráfica para visualizar jobs pendentes, em execução, concluídos ou com erro.
- Acessível em: [http://localhost:3000/admin/queues](http://localhost:3000/admin/queues)

---

## ✅ Variáveis de Ambiente (.env)

```env
PORT=3000
NODE_ENV=development

# Cron
EXAMPLE_CRON=*/10 * * * *

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=

# MySQL (opcional)
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=123456
MYSQL_DATABASE=example_db
```

---

## 🔧 Scripts disponíveis

```bash
npm run dev       
npm run build     
npm start        

```

---

## 🛠 Observações

- Para ver jobs "completos" no dashboard, usamos `removeOnComplete: { age: 240, count: 100 }`
- O Redis não exige senha por padrão, mas pode ser configurado via `.env`
- As filas são controladas com `limiter` para não sobrecarregar APIs downstream

---


