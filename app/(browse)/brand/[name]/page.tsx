import SpesificBrandCat from "@/components/shared/brandCat/SpesificBrandCat";
import { getBrand } from "@/services/brand";

interface Props {
  params: { name: string };
  searchParams?: {
    limit?: string;
    page?: string;
  };
}

// ! csr pagination

const page = async ({ params, searchParams }: Props) => {
  const { name } = params;
  const limit = Number(searchParams?.limit) || 6;
  const page = Number(searchParams?.page) || 1;

  return (
    <>
      <SpesificBrandCat
        getData={getBrand}
        label="brand"
        name={name}
        page={page}
        limit={limit}
      />
    </>
  );
};

export default page;
