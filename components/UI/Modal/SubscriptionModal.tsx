"use client";
import React, { FC, useState } from "react";
import Modal from "@/components/UI/Modal/Modal";
import { IProductWithPrice } from "@/types/Product.types";
import { IPrice } from "@/types/Price.types";
import Button from "@/components/UI/Button/Button";
import { useUser } from "@/hooks/user/useUser";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import useSubscriptionModal from "@/hooks/ui/useSubscriptionModal";

interface ISubscriptionModalProps {
  products: IProductWithPrice[];
}

const formatPrice = (price: IPrice) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);
  return priceString;
};

const SubscriptionModal: FC<ISubscriptionModalProps> = ({ products }) => {
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const { user, isLoading, subscription } = useUser();
  const { isOpen, onClose } = useSubscriptionModal();
  const onChange = (open: boolean) => {
    if (!open) onClose();
  };
  const handleCheckout = async (price: IPrice) => {
    setPriceIdLoading(price.id);
    if (!user) {
      setPriceIdLoading(undefined);
      // prajwal m
      return toast.error("Must be Logged In");
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast(`Already subscribed`);
    }

    try {
      const { sessionId } = await postData({
        url: `/api/create-checkout-session`,
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = <div className={`text-center`}>No Products Available.</div>;

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length)
            return <div key={product.id}>No Price Available.</div>;
          return product.prices.map((price) => (
            <Button
              key={price.id}
              className="mb-4"
              disabled={isLoading || price.id === priceIdLoading}
              onClick={() => {
                handleCheckout(price);
              }}
            >{`Subscribe for ${formatPrice(price)} for ${
              price.interval_count === 1 ? "a" : price.interval_count
            } ${price.interval}`}</Button>
          ));
        })}
      </div>
    );
  }
  console.log(subscription);

  if (subscription) {
    content = <div className={`text-center`}>You have Already subscribed</div>;
  }

  return (
    <Modal
      title={`Only For Premium Users`}
      description={`Listen To Music`}
      isOpen={isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};
export default SubscriptionModal;
