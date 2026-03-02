import { Request, Response } from "express";
import { getAnalyticsData } from "../../services/GA4/analyticsService.js";

type TimeFilter = "7d" | "30d" | "3m" | "6m" | "12m";

const validPeriods: TimeFilter[] = ["7d", "30d", "3m", "6m", "12m"];

const analyticsController = {
  async getAnalytics(req: Request, res: Response) {
    try {
      const period = (req.query.period as TimeFilter) ?? "30d";

      if (!validPeriods.includes(period)) {
        return res.status(400).json({ error: "Período inválido. Use: 7d, 30d, 3m, 6m ou 12m" });
      }

      const data = await getAnalyticsData(period);
      return res.status(200).json(data);
    } catch (error) {
      console.error("Erro ao buscar dados do Analytics:", error);
      return res.status(500).json({ error: "Erro ao buscar dados do Google Analytics" });
    }
  },
};

export default analyticsController;
