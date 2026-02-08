import express  from "express";
import router from "./router.js";
import coockieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";



// confugrando __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// instanciando o app como express
const app = express();

// configurando o app para receber requisições json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(coockieParser());

// Arquivos estáticos primeiro
app.use("/images", express.static(path.join(__dirname, "..", "storage", "images")));
app.use("/gallery", express.static(path.join(__dirname, "..", "storage", "gallery")));

// Depois as rotas
app.use(router);

// exportando o app para o uso no server.ts
export default app;