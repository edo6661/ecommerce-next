import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, ControllerRenderProps } from "react-hook-form";

type FormFieldProps = {
  control: Control<Record<string, any>>;
  name: string;
  label: string;
  placeholder: string;
  type: string;
};

const ActionsField: React.FC<FormFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  type,
}) => (
  <FormField
    control={control}
    name={name}
    render={({
      field,
    }: {
      field: ControllerRenderProps<FormFieldProps, "name">;
    }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type={type} placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default ActionsField;
