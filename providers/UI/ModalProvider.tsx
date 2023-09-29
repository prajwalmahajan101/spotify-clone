"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/UI/Modal/AuthModal";
import UploadModal from "@/components/UI/Modal/UploadModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
