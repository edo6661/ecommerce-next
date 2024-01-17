import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import React from "react";

interface Props {
  items: Category[];
  label: string;
}

const FormSelect = ({ label, items }: Props) => {
  return (
    <>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {items.map((item) => {
          return (
            <SelectItem value={item.id} key={item.id}>
              {item.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </>
  );
};

export default FormSelect;
