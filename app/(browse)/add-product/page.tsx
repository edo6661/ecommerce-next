import { getBrand } from "@/services/brand";
import { getCategory } from "@/services/category";
import { getSelf } from "@/services/user";
import { addProduct } from "@/actions/product";
import ActionsProductForm from "@/components/shared/product/ActionsProductForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product",
  description: "Add Product Page Mugichawn",
};

const AddProduct = async () => {
  const category = await getCategory();
  const brand = await getBrand();
  const owner = await getSelf();
  return (
    <section className="container">
      <ActionsProductForm
        actions={addProduct}
        category={category}
        brand={brand}
        owner={owner}
        label="Add"
      />
    </section>
  );
};

export default AddProduct;
