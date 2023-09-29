"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/UI/Modal/Modal";
import AuthModal from "@/components/UI/Modal/AuthModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
    </>
  );
};

export default ModalProvider;
