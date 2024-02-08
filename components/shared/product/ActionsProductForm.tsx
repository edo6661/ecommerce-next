"use client";

import { addBrand, addCategory } from "@/actions/product";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ErrorMessage } from "@hookform/error-message";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  firstStepAddProductVars,
  secondStepAddProductVars,
} from "@/utils/framer-motion";
import uploadFiles from "@/utils/shared/uploadFiles";
import { ProductData, addProductSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brand, Category, Product, User } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  dev,
  fieldsFirstStep,
  initialProduct,
  validationProductFields,
} from "@/helpers/initial/index";
import Actions from "./Actions";
import useMugi from "@/hooks/useMugi";
import ModalActions from "./ModalActions";
import UploadedImage from "./UploadedImage";
import FormSelect from "./FormSelect";
import { ConvertedProductType } from "@/types/Product";
import { DevTool } from "@hookform/devtools";
import useProductInfinite from "@/hooks/useProductInfinite";

interface Props {
  category: Category[];
  brand: Brand[];
  owner: User;
  product?: ProductData & { photos: string[]; id?: string };
  label: string;
  actions: (body: ConvertedProductType) => Promise<Product | undefined>;
}

const AddProductForm = ({
  category,
  brand,
  owner,
  product,
  label,
  actions,
}: Props) => {
  const router = useRouter();
  const { refetch } = useProductInfinite();
  const [isPending, startTransition] = useTransition();
  const { categoryModal, falseCategoryModal, brandModal, falseBrandModal } =
    useMugi((state) => state);

  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFile, setUploadedFile] = useState<string[]>([]);
  const [formStep, setFormStep] = useState(0);

  const initialState = product ? { ...product } : { ...initialProduct };

  useEffect(() => {
    product && setUploadedFile(product.photos);
  }, [product]);
  const form = useForm({
    defaultValues: {
      ...initialState,
    },
    resolver: zodResolver(addProductSchema),
    mode: "onTouched",
  });

  const handleFile = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.files && setFiles(Array.from(e.target.files));

  const handleDeleteUpload = (indexToDelete: number) => {
    setUploadedFile((prev) => prev.filter((_, i) => i !== indexToDelete));
    setFiles((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  const previewFile = async () => {
    if (files.length <= 6) {
      try {
        const uploadedUrls = await uploadFiles(files, "products");
        return setUploadedFile((prev) => [...prev, ...uploadedUrls]);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    } else {
      toast.error("File gaboleh lebih dari 6");
    }
  };

  const onSubmit = async (data: ProductData) => {
    if (!form.formState.isDirty) {
      return;
    }
    const convertedType = {
      ...data,
      ...(product && { id: product.id }),
      quantity: +data.quantity,
      price: +data.price,
      discountPrice: +data.discountPrice,
      photos: uploadedFile.join(","),
      ownerId: owner.id,
    };
    startTransition(() => {
      actions(convertedType)
        .then((product) => {
          toast.success(`You are ${label}ing ${product?.name} item`);
          refetch();
          router.push("/");
        })
        .catch((err) => {
          console.error(err);
          toast.error(dev);
        });
    });
  };

  const imageUploadElement =
    formStep === 1 &&
    uploadedFile?.map((file, i) => (
      <UploadedImage
        key={file}
        i={i}
        handleDeleteUpload={handleDeleteUpload}
        file={file}
      />
    ));

  const elementFirstStep = (
    <>
      {fieldsFirstStep.map((fields) => {
        if (
          [
            "name",
            "description",
            "discountPrice",
            "price",
            "quantity",
            "categoryId",
            "brandId",
            "photos",
            "id",
          ].includes(fields.name)
        ) {
          return (
            <FormItem key={fields.name}>
              <FormLabel>{fields.label}</FormLabel>
              <Controller
                control={form.control}
                name={
                  fields.name as
                    | "name"
                    | "description"
                    | "discountPrice"
                    | "price"
                    | "quantity"
                    | "categoryId"
                    | "brandId"
                    | "photos"
                    | "id"
                    | `photos.${number}`
                }
                render={({ field }) => (
                  <FormControl>
                    <Input
                      type={fields.type}
                      placeholder={fields.placeholder}
                      {...field}
                    />
                  </FormControl>
                )}
              />
              <FormMessage />
              <div className=" text-red-500 pl-2 text-sm font-semibold">
                <ErrorMessage
                  name={fields.name}
                  errors={form.formState.errors}
                />
              </div>
            </FormItem>
          );
        }
        return null;
      })}
    </>
  );

  const modalCategory = categoryModal && (
    <ModalActions
      label="Category"
      falseModal={falseCategoryModal}
      addAction={addCategory}
    />
  );

  const modalBrand = brandModal && (
    <ModalActions
      label="Brand"
      falseModal={falseBrandModal}
      addAction={addBrand}
    />
  );

  return (
    <div
      className={cn(
        "containerAddProduct",
        categoryModal || brandModal ? "modalOpen relative" : ""
      )}
    >
      {/* <DevTool control={form.control} /> */}
      {modalBrand}
      {modalCategory}
      <Card className="cardAddProduct ">
        <CardHeader>
          <CardTitle>{label} Product</CardTitle>
          <CardDescription>with mugi chan</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="formAddProduct"
            >
              <motion.div
                className={cn("space-y-3", {})}
                variants={firstStepAddProductVars}
                initial="initial"
                animate={formStep === 1 ? "animate" : "reverse"}
              >
                {elementFirstStep}
              </motion.div>
              <AnimatePresence>
                <motion.div
                  className={cn("space-y-3 absolute top-0 left-0 right-0", {
                    hidden: formStep === 0,
                  })}
                  variants={secondStepAddProductVars}
                  initial="initial"
                  animate={formStep === 1 ? "animate" : ""}
                  exit="exit"
                >
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormSelect items={category} label="Category" />
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brandId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Brand</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormSelect items={brand} label="Brand" />
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Actions />
                  <Input type="file" onChange={handleFile} multiple />
                  <Button
                    className="w-full"
                    variant="outline"
                    type="button"
                    onClick={previewFile}
                    disabled={!files.length}
                  >
                    Preview & Upload
                  </Button>
                </motion.div>
              </AnimatePresence>
              {imageUploadElement}
              <div className="flex gap-2 pt-4">
                <Button
                  disabled={
                    uploadedFile.length === 0 ||
                    isPending ||
                    !form.formState.isDirty
                  }
                  type="submit"
                  className={cn("", {
                    hidden: formStep === 0,
                  })}
                >
                  {isPending ? "Loading..." : "Submit"}
                </Button>
                <Button
                  type="button"
                  variant={"ghost"}
                  className={cn("", {
                    hidden: formStep == 1,
                  })}
                  onClick={async () => {
                    const isValid = await form.trigger(validationProductFields);
                    if (isValid) {
                      setFormStep(1);
                    }

                    return;
                  }}
                  disabled={!form.formState.isValid}
                  onKeyDown={(e) => e.key === "Tab" && e.preventDefault()}
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => {
                    setFormStep(0);
                  }}
                  className={cn({
                    hidden: formStep == 0,
                  })}
                >
                  Go Back
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductForm;
