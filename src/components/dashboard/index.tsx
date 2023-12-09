"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@mantine/core";
import { Search } from "@/components/search";
import { DatePicker } from "@/components/input/Input";
import { LineChart } from "@/components/chart/chart";
import { getStock } from "@/service/api";

import { Favorites } from "@/components/favorites";
import { Header } from "@/components/header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Stock {
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}
const Dashboard = () => {
  const session = useSession();

  const router = useRouter();

  const [stock, setStock] = useState<Stock[] | null>(null);
  const [spyStock, setSpyStock] = useState<Stock[] | null>(null);
  const [selectedStock, setSelectedStock] = useState("");
  const [startData, setStartData] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    getStock("AAPL", "2023-05-04", "2023-08-05").then((data) => {
      setStock(Object.values(data));
    });
    getStock("SPY", "2023-05-04", "2023-08-05").then((data) => {
      setSpyStock(Object.values(data));
    });
  }, []);

  if (session.status === "loading") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>loading...</p>
      </div>
    );
  }
  if (session.status === "unauthenticated") {
    router.push("/auth/sign-in");
  }
  const handleSubmit = () => {
    if (selectedStock && startData && endDate && endDate > startData) {
      getStock(
        selectedStock,
        new Date(startData).toISOString().split("T")[0] as string,
        new Date(endDate).toISOString().split("T")[0] as string,
      ).then((data) => {
        setStock(Object.values(data));
      });
      getStock(
        "SPY",
        new Date(startData).toISOString().split("T")[0] as string,
        new Date(endDate).toISOString().split("T")[0] as string,
      ).then((data) => {
        setSpyStock(Object.values(data));
      });
    }
  };
  return (
//     <div className="h-full bg-primary ">
//       <Header />
//       <div className="flex w-full justify-center gap-x-5 px-5 pt-24">
//         <div className="flex w-full max-w-[300px] flex-col gap-y-5 rounded-3xl bg-secondary p-5">
//           {/* <div className="flex gap-x-2">
//             <DatePicker label="Start date" value={startData} setValue={setStartData} />
//             <DatePicker label="End date" value={endDate} setValue={setEndDate} />
//           </div>
//           <button 
//            className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none"
//           onClick={handleSubmit}>
//             Go
//           </button>
//         </div> */}
//         <div className="flex items-center gap-x-2">
//           <DatePicker label={"Start date"} value={startData} setValue={setStartData} />
//           <DatePicker label={"End date"} value={endDate} setValue={setEndDate} />
//           <button 
//             className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none"
//             onClick={handleSubmit}
//           >
//             Go
//           </button>
// </div>
//         <div className="">
//   {stock && spyStock && (
//     <LineChart stocks={stock} stocks2={spyStock} nameStock={selectedStock} />
//   )}
//   {/* <Favorites handleClick={setSelectedStock} /> */}
//   </div>
//   </div>
//     </div>
//     </div>
<div className="f-full ">
  <Header />
  <div className="flex w-full justify-center gap-x-5 px-5 pt-24">
  <div className="flex w-full max-w-[300px] flex-col gap-y-5 rounded-3xl bg-secondary p-5">
    {/* <div className="flex items-center gap-x-2">
      <DatePicker label="Start date" value={startData} setValue={setStartData} />
      <DatePicker label="End date" value={endDate} setValue={setEndDate} />
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none"
        onClick={handleSubmit}
      >
        Go
      </button>
    </div> */}
  </div>

  <div className="flex items-center gap-x-2">
    <DatePicker label="Start date" value={startData} setValue={setStartData} />
    <DatePicker label="End date" value={endDate} setValue={setEndDate} />
    <button
      className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none"
      onClick={handleSubmit}
    >
      Go
    </button>
  </div>

</div>
  <div>
  {stock && spyStock && (
    <LineChart
      stocks={stock}
      stocks2={spyStock}
      nameStock={selectedStock}
    />
  )}
  <Favorites handleClick={setSelectedStock} />
</div>

</div>
  );
};

export default Dashboard;

          {/* <Input.Wrapper label="Stock name" className="!text-white">
            <Search value={selectedStock} setValue={setSelectedStock} />
          </Input.Wrapper> */}