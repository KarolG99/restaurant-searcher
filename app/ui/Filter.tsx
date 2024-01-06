import React from "react";

type FilterProps = {
  id: string;
  name: string;
  inputName: string;
};

const Filter = ({ id, name, inputName }: FilterProps) => {
  return (
    <>
      <input
        type="radio"
        id={id.toString()}
        name={inputName}
        className="opacity-0 w-0 h-0 custom"
      />
      <label
        htmlFor={id.toString()}
        className=" text-m border border-black px-[11px] py-[5px] rounded-[20px] cursor-pointer ml-[-12px]"
      >
        {name}
      </label>
    </>
  );
};

export default Filter;
