// utils/blackScholes.js
import { erf } from "mathjs";

export function blackScholes(
  stockPrice,
  strikePrice,
  daysLeft,
  riskFreeRate,
  volatility,
  optionType
) {
  const timeToExpiration = daysLeft / 365.0;

  const d1 =
    (Math.log(stockPrice / strikePrice) +
      (riskFreeRate + 0.5 * volatility ** 2) * timeToExpiration) /
    (volatility * Math.sqrt(timeToExpiration));
  const d2 = d1 - volatility * Math.sqrt(timeToExpiration);

  const normCDF = (x) => 0.5 * (1 + erf(x / Math.sqrt(2)));

  let optionPrice;
  if (optionType === "ce") {
    optionPrice =
      stockPrice * normCDF(d1) -
      strikePrice * Math.exp(-riskFreeRate * timeToExpiration) * normCDF(d2);
  } else if (optionType === "pe") {
    optionPrice =
      strikePrice * Math.exp(-riskFreeRate * timeToExpiration) * normCDF(-d2) -
      stockPrice * normCDF(-d1);
  } else {
    throw new Error("Invalid option_type. Use 'ce' or 'pe'.");
  }

  return optionPrice;
}
