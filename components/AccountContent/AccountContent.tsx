"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSubscriptionModal from "@/hooks/ui/useSubscriptionModal";
import { useUser } from "@/hooks/user/useUser";
import { postData } from "@/libs/helpers";
import toast from "react-hot-toast";
import Button from "@/components/UI/Button/Button";

const AccountContent = () => {
  const router = useRouter();
  const subscriptionModal = useSubscriptionModal();
  const { user, isLoading, subscription } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/");
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({ url: `/api/create-portal-link` });
      window.location.assign(url);
      if (error) {
        toast.error(error.message);
      }
    } catch (error: any) {
      if (error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={"md-7 px-6"}>
      {!subscription && (
        <div className={`flex flex-col gap-y-4 items-center justify-center`}>
          <p>No Active Plan.</p>
          <Button
            className={`w-[300px]`}
            onClick={() => {
              subscriptionModal.onOpen();
            }}
          >
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div
          className={`flex flex-col gap-y-4 h-full items-center justify-center`}
        >
          <p>
            You are currently on the{" "}
            <b>{subscription?.prices?.products?.name}</b> plan.
          </p>
          <Button
            disabled={loading || isLoading}
            className={`w-[300px]`}
            onClick={() => {
              redirectToCustomerPortal();
            }}
          >
            Open Customer Portal
          </Button>
        </div>
      )}
    </div>
  );
};
export default AccountContent;
