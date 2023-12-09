import React, { FC, useState } from "react";
import symbols from "@/service/symbols.json";

export const Favorites = ({ handleClick }: { handleClick: (item: string) => void }) => {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  const handleAddFavorite = (item: string) => {
    setFavorites((prevState) => ({ ...prevState, [item]: true }));
  };

  const handleRemoveFavorite = (item: string) => {
    setFavorites((prevState) => ({ ...prevState, [item]: false }));
  };

  return (
    <div className="  max-w-[300px] overflow-y-auto rounded-3xl py-5">
     <h1 className="px-5 text-xl font-medium text-black">Favorites</h1>

    <div className="w-300">
  {symbols.map((symbol) => (
    <div
  key={symbol.symbol}
  className="flex cursor-pointer items-center justify-between px-5 py-2"
>
  <button
    className="w-300 text-left bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
    onClick={() => handleClick(symbol.symbol)}
  >
    {symbol.symbol}
  </button>
  <button
    className="px-2 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
    onClick={() =>
      favorites[symbol.symbol]
        ? handleRemoveFavorite(symbol.symbol)
        : handleAddFavorite(symbol.symbol)
    }
  >
    {favorites[symbol.symbol] ? "Remove" : "Save"}
  </button>
</div>
  ))}
</div>
    </div>
  );
};
