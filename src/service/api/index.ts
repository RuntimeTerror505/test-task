import axios from "axios";

export const getStock = async (symbol: string, start: string, end: string) => {
  const { data } = await axios.get(
    `https://api.tradier.com/v1/markets/history?symbol=${symbol}&interval=daily&start=${start}&end=${end}&session_filter=all`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TRADIER_API_KEY}` ,
        Accept: "application/json",
      },
    }
  );

  const stock = data.history.day;
  return stock;
};
