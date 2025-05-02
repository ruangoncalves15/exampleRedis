
import app from "./app";
import { env } from "./configs/envs.config";

app.listen(env.PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${env.PORT}`);
});

