"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useUploadModal from "@/hooks/ui/useUploadModal";
import Modal from "@/components/UI/Modal/Modal";
import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import { useUser } from "@/hooks/user/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!user) {
        toast.error("Please LogIn to Add Songs");
        return;
      } else if (!imageFile || !songFile) {
        toast.error("Missing fields");
        return;
      }
      setIsLoading(true);
      const uniqueId = uniqid();

      // Upload Songs

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(
          `song-${values.title.split(" ").join("-")}-${uniqueId}`,
          songFile,
          {
            cacheControl: "3600",
            upsert: false,
          },
        );

      if (songError) {
        setIsLoading(false);
        toast.error("Failed Song Upload.");
        return;
      }

      // Upload Image

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(
            `image-${values.title.split(" ").join("-")}-${uniqueId}`,
            imageFile,
            {
              cacheControl: "3600",
              upsert: false,
            },
          );

      if (imageError) {
        setIsLoading(false);
        toast.error("Failed Image Upload.");
        return;
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData?.path,
          song_path: songData?.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        toast.error(supabaseError.message);
        return;
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Song Added!!");
      reset();
      uploadModal.onClose();
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={"Add a New Song"}
      description={"Upload an mp3 file"}
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex flex-col gap-y-4"}
      >
        <Input
          id={"title"}
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder={"Song title"}
        ></Input>
        <Input
          id={"author"}
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder={"Song author"}
        ></Input>
        <div>
          <div className={"pb-1"}>Select a Song File</div>
          <Input
            id={"song"}
            type={"file"}
            disabled={isLoading}
            accept={".mp3"}
            {...register("song", { required: true })}
          ></Input>
        </div>
        <div>
          <div className={"pb-1"}>Select a Image File</div>
          <Input
            id={"image"}
            type={"file"}
            disabled={isLoading}
            accept={"image/*"}
            {...register("image", { required: true })}
          ></Input>
        </div>
        <Button disabled={isLoading} type={"submit"}>
          Create
        </Button>
      </form>
    </Modal>
  );
};
export default UploadModal;
