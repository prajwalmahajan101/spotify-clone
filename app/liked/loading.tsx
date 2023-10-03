"use client";
import React from "react";
import Box from "@/components/UI/Box/Box";
import { BounceLoader } from "react-spinners";
const Loading = () => {
  return (
    <Box className={`h-full flex items-center justify-center gap-x-2`}>
      <BounceLoader color={"#22c55e"} size={40} />
      Loading.....
    </Box>
  );
};
export default Loading;
