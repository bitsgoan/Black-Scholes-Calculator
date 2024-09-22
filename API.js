// pages/api/calculate.js
import { blackScholes } from "./priceCalculator";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { stockPrice, strikePrice, daysLeft, volatility, optionType } =
      req.body;

    try {
      const price = blackScholes(
        parseFloat(stockPrice),
        parseFloat(strikePrice),
        parseFloat(daysLeft),
        parseFloat(volatility),
        optionType
      );

      res.status(200).json({ price });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
