import React, { FC } from "react";
import { DateInput } from "@mantine/dates";

type Props =  {
  label?: string,
  value?: any,
  setValue?: (data:any)=>void,
}
export const DatePicker:FC = ({label, value, setValue}: Props) => {
  return (
    <DateInput
    className="!text-white"
    label={label}
    placeholder="Date input"
    value={value}
    onChange={setValue}
    valueFormat="YYYY MMM DD"
  />
  );
};

