import express  from "express";
import router from "./router.js";
import coockieParser from "cookie-parser";

// instanciando o app como express
const app = express();

// configurando o app para receber requisições json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(coockieParser());
app.use(router);


// exportando o app para o uso no server.ts
export default app;