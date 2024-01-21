import { ActionsData, addActionsSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash, XSquare } from "lucide-react";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import uploadFiles from "@/utils/shared/uploadFiles";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import UploadedImage from "./UploadedImage";
import { toast } from "sonner";
import { dev } from "@/helpers/initial";
import { AnimatePresence, motion } from "framer-motion";
import { actionsModalVars } from "@/utils/framer-motion";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, ControllerRenderProps } from "react-hook-form";

interface Props {
  label: string;
  falseModal: () => void;
  addAction: (body: ActionsData) => Promise<ActionsData>;
}

const ModalActions = ({ label, falseModal, addAction }: Props) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFile, setUploadedFile] = useState<string[]>();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.files && setFiles(Array.from(e.target.files));

  const form = useForm({
    defaultValues: {
      name: "",
      photo: "",
    },
    resolver: zodResolver(addActionsSchema),
  });

  const onSubmit = async (data: ActionsData) => {
    const convertedData = { ...data, photo: uploadedFile?.toString()! };
    startTransition(() => {
      addAction(convertedData)
        .then((data) => {
          if (data) {
            toast.success(`You are creating ${data.name} ${label}`);
            router.push("/");
          } else {
            toast.error(dev);
          }
        })
        .catch((err) => toast.error(dev));
    });
  };

  const previewFile = async () => {
    try {
      const uploadedUrls = await uploadFiles(files, label);
      setUploadedFile(uploadedUrls);
    } catch (err) {
      console.error("Error uploading files:", err);
    }
  };

  const handleDeleteUpload = (indexToDelete: number) => {
    setUploadedFile(uploadedFile?.filter((_, i) => i !== indexToDelete));
    setFiles(files.filter((_, i) => i !== indexToDelete));
  };

  const imageUploadElement = uploadedFile?.map((file, i) => (
    <UploadedImage
      key={file}
      i={i}
      handleDeleteUpload={handleDeleteUpload}
      file={file}
    />
  ));

  return (
    <AnimatePresence>
      <motion.div
        className="modalActionsContainer keepModalOpen"
        variants={actionsModalVars}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="innerModalActions">
          <div className="detailsModalActions  ">
            <h5 className="font-semibold">Add {label}</h5>
            <button type="button" onClick={falseModal}>
              <XSquare className=" text-background dark:text-white " />
            </button>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className=" space-y-3">
                <FormItem>
                  <FormLabel>{label + "Name"}</FormLabel>
                  <Controller
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={`Enter your ${label} Name..`}
                          {...field}
                        />
                      </FormControl>
                    )}
                  />
                  <FormMessage />
                </FormItem>

                <Input type="file" onChange={handleFile} />
                <Button
                  className="w-full"
                  variant="outline"
                  type="button"
                  onClick={previewFile}
                  disabled={files.length === 0}
                >
                  Preview & Upload
                </Button>
                {imageUploadElement}
                <Button disabled={uploadedFile?.length === 0 || isPending}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalActions;
