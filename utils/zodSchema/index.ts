import * as z from "zod";

const basabasiString = "Must be at least 3 characters";
const basabasiNumber = "Should be a number";

export const addProductSchema = z.object({
  name: z.string().min(3, { message: `Username ${basabasiString}` }),
  description: z.string().min(3, { message: `Description ${basabasiString}` }),
  discountPrice: z
    .string()
    .min(1)
    .refine((val) => !isNaN(val as unknown as number), {
      message: `Discount price ${basabasiNumber}`,
    }),
  price: z
    .string()
    .min(1)
    .refine((val) => !isNaN(val as unknown as number), {
      message: `Price ${basabasiNumber}`,
    }),
  quantity: z
    .string()
    .min(1)
    .refine((val) => !isNaN(val as unknown as number), {
      message: `Quantity ${basabasiNumber}`,
    }),
  categoryId: z.string(),
  brandId: z.string(),
  // photos: z.string(),
});

export const addActionsSchema = z.object({
  name: z.string().min(3, { message: basabasiString }),
  photo: z.string(),
});

export type ActionsData = z.infer<typeof addActionsSchema>;
export type ProductData = z.infer<typeof addProductSchema>;
