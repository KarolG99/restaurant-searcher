"use client";

import Lottie from "lottie-react";

import burgerLoading from "./burger-loading.json";

const Loader = () => {
  return (
    <div className="fixed top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] w-[80%] max-w-[300px]">
      <Lottie animationData={burgerLoading} loop />
    </div>
  );
};

export default Loader;
