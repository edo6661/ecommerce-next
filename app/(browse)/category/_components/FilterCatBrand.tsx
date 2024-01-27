"use client";
import FormSelect from "@/components/shared/product/FormSelect";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select } from "@radix-ui/react-select";
import React from "react";
import { useForm } from "react-hook-form";
import { initialProduct } from "@/helpers/initial";

const FilterCatBrand = () => {
  const brand = [
    { id: "1", name: "Latest", photo: "" },
    { id: "2", name: "Rating", photo: "" },
    { id: "3", name: "Sold", photo: "" },
    { id: "4", name: "Highest Price", photo: "" },
    { id: "5", name: "Lowest Price", photo: "" },
  ];
  const form = useForm({
    defaultValues: {
      ...initialProduct,
    },
  });

  return (
    <Form {...form}>
      <form className=" ">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormSelect items={brand} label="Sort" />
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default FilterCatBrand;
