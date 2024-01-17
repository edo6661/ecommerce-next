export const initialProduct = {
  name: "",
  description: "",
  discountPrice: "",
  price: "",
  quantity: "",
  brandId: "",
  categoryId: "",
  // photos: "",
};

export const validationProductFields: (
  | "name"
  | "description"
  | "discountPrice"
  | "price"
  | "quantity"
)[] = ["name", "description", "discountPrice", "price", "quantity"];

export const fieldsFirstStep = [
  {
    name: "name",
    label: "Product Name",
    placeholder: "Enter your Name...",
    type: "text",
  },
  {
    name: "description",
    label: "Product Description",
    placeholder: "Enter your Description...",
    type: "text",
  },
  {
    name: "discountPrice",
    label: "Product Discount Price",
    placeholder: "Enter your Discount Price...",
    type: "number",
  },
  {
    name: "price",
    label: "Product Price",
    placeholder: "Enter your Price...",
    type: "number",
  },
  {
    name: "quantity",
    label: "Product Quantity",
    placeholder: "Enter your Quantity...",
    type: "number",
  },
  // Tambahkan field lainnya di sini
];

export const dev =
  "Something went wrong contact the person who created this in footer";

export const firstMockPosters = [
  "https://cf.shopee.co.id/file/id-50009109-4e25dfa37e265d99192f46dff2d8e39a_xxhdpi",
  "https://cf.shopee.co.id/file/id-50009109-b36a2f24939caa00a796df79fd0e0c99_xxhdpi",
  "https://cf.shopee.co.id/file/id-50009109-8f11e274899ed55fc009e17b855d549c_xxhdpi",
  "https://cf.shopee.co.id/file/id-50009109-835cc6591e94d96472837275880e3632_xxhdpi",
];
export const singleMockPoster =
  "https://cf.shopee.co.id/file/id-50009109-4e25dfa37e265d99192f46dff2d8e39a_xxhdpi";
export const secondMockPoster =
  "https://cf.shopee.co.id/file/id-50009109-835cc6591e94d96472837275880e3632_xxhdpi";

export const thirdMockPoster =
  "https://cf.shopee.co.id/file/id-50009109-a54401642802fdbbf90cefa7b932aadc_xhdpi";
