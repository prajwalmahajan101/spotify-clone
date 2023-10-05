"use client";
import React from "react";
import Box from "@/components/UI/Box/Box";
import { BiSolidError } from "react-icons/bi";
const Error = () => {
  return (
    <Box className={`h-full flex items-center justify-center gap-x-2`}>
      <BiSolidError color={"#7c0f0f"} size={40} />
      Something Went Wrong
    </Box>
  );
};
export default Error;
