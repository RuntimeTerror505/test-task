import React, { FC } from "react";
import {Select } from "@mantine/core";
import symbols from "@/service/symbols.json";
import react from "react";
type Props =  {
  value: any;
  setValue: (data: any) => void;
}

const SearchBar = ({ value, setValue }: Props) => {
  return (
    <Select
      placeholder="Type here"
      data={symbols.map((item) => item.symbol)}
      searchable
      value={value}
      onChange={setValue}
      rightSectionPointerEvents="none"
    />
  );
};


export const Search = react.memo(SearchBar)
