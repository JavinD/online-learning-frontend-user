import React from "react";

import makeAnimated from "react-select/animated";
import Select from "react-select";
import { ITag } from "../../../interfaces";

const animatedComponents = makeAnimated();

type Props = {
  options: { id: number; name: string }[];
  isMulti: boolean;
  handleChange: (newValue: any, actionMeta: any) => void;
  placeholder: string;
};

export default function GenericSelect({
  options,
  isMulti,
  handleChange,
  placeholder,
}: Props) {
  const createOption = (id: number, name: string) => ({
    label: name,
    value: id.toString(),
  });

  const newOptions = options.map((option) =>
    createOption(option.id, option.name)
  );

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti={isMulti}
      options={newOptions}
      onChange={handleChange}
      isClearable
      placeholder={placeholder}
    />
  );
}
