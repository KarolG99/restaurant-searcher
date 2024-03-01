import React from "react";

type FilterProps = {
  id: string;
  name: string;
  inputName: string;
  type: string;
  onChange?: () => void;
  checked?: boolean;
  defaultChecked?: boolean;
};

const Filter = ({
  id,
  name,
  inputName,
  type,
  onChange,
  checked,
  defaultChecked,
}: FilterProps) => {
  return (
    <>
      <input
        type={type}
        id={id.toString()}
        name={inputName}
        className="opacity-0 w-0 h-0 custom"
        onChange={onChange}
        checked={checked}
        defaultChecked={defaultChecked}
      />
      <label
        htmlFor={id.toString()}
        className=" text-m border border-black px-[11px] py-[5px] rounded-[20px] cursor-pointer ml-[-12px] whitespace-nowrap"
      >
        {name}
      </label>
    </>
  );
};

export default Filter;
