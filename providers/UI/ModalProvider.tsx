"use client";

import { FC, useEffect, useState } from "react";

import AuthModal from "@/components/UI/Modal/AuthModal";
import UploadModal from "@/components/UI/Modal/UploadModal";
import SubscriptionModal from "@/components/UI/Modal/SubscriptionModal";
import { IProductWithPrice } from "@/types/Product.types";

interface IModalProviderProps {
  products: IProductWithPrice[];
}
const ModalProvider: FC<IModalProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscriptionModal products={products} />
    </>
  );
};

export default ModalProvider;
