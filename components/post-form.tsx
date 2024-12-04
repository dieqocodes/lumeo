"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadThing } from "@/lib/uploadthing";
import Dropzone, { type FileRejection } from "react-dropzone";
import { Loader2, Image, RotateCw } from "lucide-react";
import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import MaxWidthWrapper from "./max-width-wrapper";
import { useState } from "react";
import { toast } from "sonner";
import { createPost } from "@/actions";

const formSchema = z.object({
  imageUrl: z.string().min(1),
});

export default function PostForm() {
  const [imageAssets, setImageAssets] = useState<string | null>(null);
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      setImageAssets(data.serverData.url);
      form.setValue("imageUrl", data.serverData.url);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
    },
  });

  const onDropAccepted = async (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });
  };

  const onDropRejected = async (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    toast.error(
      `${file.file.type} type is not supported. Please choose a PNG, JPG, or JPEG image instead.`
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = await createPost({ imageUrl: values.imageUrl });

    if (data.success) {
      toast.success("Post created");
      form.reset();
      setImageAssets(null);
    }
  };
  return (
    <Form {...form}>
      <MaxWidthWrapper className="py-10 h-[85vh]">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col justify-center items-center gap-4"
        >
          <div className="w-1/2 h-[70vh] rounded-xl p-4 grid place-items-center border">
            <Dropzone
              accept={{
                "image/jpg": [".jpg"],
                "image/jpeg": [".jpeg"],
                "image/png": [".png"],
              }}
              onDropAccepted={onDropAccepted}
              onDropRejected={onDropRejected}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="w-full h-full grid place-items-center relative"
                >
                  <input {...getInputProps()} />
                  {!imageAssets && !isUploading && (
                    <Image className="text-muted-foreground" />
                  )}
                  {isUploading && <Loader2 className="animate-spin" />}
                  {imageAssets && (
                    <>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setImageAssets(null);
                          form.reset();
                        }}
                      >
                        <RotateCw size={15} />
                      </Button>
                      <img
                        src={imageAssets}
                        alt="uploaded image"
                        className="w-full h-full object-contain"
                      />
                    </>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          <Button className="w-1/2">Post</Button>
        </form>
      </MaxWidthWrapper>
    </Form>
  );
}
