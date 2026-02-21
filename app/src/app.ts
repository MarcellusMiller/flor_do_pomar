import express from "express";
import router from "./router.js";
import coockieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(coockieParser());

// logger ANTES das rotas
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// router UMA VEZ apenas
app.use(router);

// estáticos
app.use("/images", express.static(path.join(__dirname, "..", "storage", "images")));
app.use("/gallery", express.static(path.join(__dirname, "..", "storage", "gallery")));
app.use("/documents", express.static(path.join(__dirname, "..", "storage", "documents")));

export default app;