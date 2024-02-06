"use client";
import FormSelect from "@/components/shared/product/FormSelect";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Payment } from "@prisma/client";
import { Select } from "@radix-ui/react-select";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const MockPayment = ({
  payment,
  setPay,
}: {
  payment: Payment[];
  setPay: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const form = useForm({
    defaultValues: {
      paymentId: "",
    },
  });

  const paymentId = form.watch("paymentId");

  useEffect(() => {
    setPay(paymentId);
  }, [paymentId]);

  return (
    <>
      <Form {...form}>
        <form className="py-4">
          <FormField
            control={form.control}
            name="paymentId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormSelect items={payment} label="Mock Payment" />
                </Select>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default MockPayment;
