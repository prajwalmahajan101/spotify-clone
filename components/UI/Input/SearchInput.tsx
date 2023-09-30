"use client";
import React, { useState, useEffect } from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/ui/useDebounce";
import Input from "@/components/UI/Input/Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debounceValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = { title: debounceValue };
    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });
    router.push(url);
  }, [debounceValue, router]);

  return (
    <Input
      placeholder={"What do You want to listen to ?"}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
export default SearchInput;
