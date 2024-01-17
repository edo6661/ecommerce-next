import { getProducts } from "@/services/product";
import { Suspense, lazy } from "react";

const SuspensedComponent = lazy(() => import("./Products"));

async function SuspensedProducts() {
  const products = await getProducts();

  return (
    <div className="containerProductsMansory">
      <Suspense
        fallback={
          <h1 className="text-5xl text-red-500 text-center z-50">
            Test Suspense...
          </h1>
        }
      >
        {products.map((product) => {
          const urls = product.photos.split(",");
          return (
            <SuspensedComponent key={product.id} {...product} urls={urls} />
          );
        })}
      </Suspense>
    </div>
  );
}

export default SuspensedProducts;
