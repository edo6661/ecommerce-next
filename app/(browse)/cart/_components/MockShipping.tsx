"use client";
import FormSelect from "@/components/shared/product/FormSelect";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select } from "@radix-ui/react-select";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { initialProduct } from "@/helpers/initial";
import { Shipping } from "@prisma/client";

const MockShipping = ({
  shipping,
  setShip,
}: {
  shipping: Shipping[];
  setShip: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const form = useForm({
    defaultValues: {
      shippingId: "",
    },
  });

  const shippingId = form.watch("shippingId");

  useEffect(() => {
    setShip(shippingId);
  }, [shippingId]);

  return (
    <>
      <Form {...form}>
        <form className="py-4">
          <FormField
            control={form.control}
            name="shippingId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormSelect items={shipping} label="Mock Shipping" />
                </Select>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default MockShipping;
