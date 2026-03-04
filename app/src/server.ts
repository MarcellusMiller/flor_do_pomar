import app from "./app.js";
import dotenv from "dotenv";
import { startAnalyticsSnapshotJob } from "./jobs/analyticsSnapshotJob.js";

const PORT = process.env.PORT || 3000;

// função que começa o servidor
// posteriormente ela sera asincrona
function startServer() {
    
    // app escutando a porta
    app.listen(PORT, () => {
    console.log("server running")
    console.log("click + ctrl http://localhost:3000");
    })
    startAnalyticsSnapshotJob();
}

// invocando a função que começa o servidor
startServer();