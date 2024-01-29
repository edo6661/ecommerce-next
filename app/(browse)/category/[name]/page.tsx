import SpesificBrandCat from "@/components/shared/brandCat/SpesificBrandCat";
import { getCategory } from "@/services/category";

interface Props {
  params: { name: string };
  searchParams?: {
    limit?: string;
    page?: string;
  };
}

const page = async ({ params, searchParams }: Props) => {
  const { name } = params;

  const limit = Number(searchParams?.limit) || 6;
  const page = Number(searchParams?.page) || 1;

  return (
    <>
      <SpesificBrandCat
        getData={getCategory}
        label="category"
        name={decodeURIComponent(name)}
        page={page}
        limit={limit}
      />
      {/* <SpesificBrandCat
        getData={getCategory}
        label="category"
        name={name}
        page={page}
        limit={limit}
      /> */}
    </>
  );
};

export default page;
