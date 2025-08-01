import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

router.get("/:country", async (req: Request, res: Response) => {
  const country = req.params.country;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Weather API key is missing" });
  }

  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json`,
      {
        params: {
          key: apiKey,
          q: country,
        },
      }
    );

    return res.json(response.data);
  } catch (error: any) {
    if (error.response) {
      return res.status(error.response.status).json({
        error:
          error.response.data?.error?.message || "Failed to fetch weather data",
      });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
