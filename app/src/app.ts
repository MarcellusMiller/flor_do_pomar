import express  from "express";
import router from "./router.js";

// instanciando o app como express
const app = express();

// configurando o app para receber requisições json

app.use(express.json());
app.use(router);


// exportando o app para o uso no server.ts
export default app;