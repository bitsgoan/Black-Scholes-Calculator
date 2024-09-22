// app/api/calculate/route.js
import { NextResponse } from "next/server";
import { blackScholes } from "../../../../utils/blackScholes";

export async function POST(request) {
  const {
    stockPrice,
    strikePrice,
    daysLeft,
    riskFreeRate,
    volatility,
    optionType,
  } = await request.json();

  try {
    const price = blackScholes(
      parseFloat(stockPrice),
      parseFloat(strikePrice),
      parseFloat(daysLeft),
      parseFloat(riskFreeRate),
      parseFloat(volatility),
      optionType
    );

    return NextResponse.json({ price });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
