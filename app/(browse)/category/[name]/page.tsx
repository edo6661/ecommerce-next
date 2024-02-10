import SpesificBrandCat from "@/components/shared/brandCat/SpesificBrandCat";
import { upperFirst } from "@/helpers";
import { getCategory, getCategoryByName } from "@/services/category";
import { ResolvedMetadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: { name: string };
  searchParams?: {
    limit?: string;
    page?: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvedMetadata
) {
  const decodedName = upperFirst(decodeURIComponent(params.name));
  const category = await getCategoryByName(decodeURIComponent(params.name));

  if (!category) {
    return notFound();
  }

  const previousImage = (await parent).openGraph?.images || [];

  return {
    title: category.name ? upperFirst(category.name) : decodedName,
    description: `Description ${category?.name || decodedName}`,
    openGraph: {
      images: [{ url: category.photo }, ...previousImage],
    },
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
