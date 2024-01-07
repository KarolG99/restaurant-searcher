import React from "react";

type FilterProps = {
  id: string;
  name: string;
  inputName: string;
  type: string;
  onChange?: () => void;
  checked?: boolean;
};

const Filter = ({
  id,
  name,
  inputName,
  type,
  onChange,
  checked,
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
