import SpesificBrandCat from "@/components/shared/brandCat/SpesificBrandCat";
import { upperFirst } from "@/helpers";
import { getBrand, getBrandByName } from "@/services/brand";
import { ResolvingMetadata } from "next";
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
  parent: ResolvingMetadata
) {
  const decodedName = upperFirst(decodeURIComponent(params.name));
  const brand = await getBrandByName(decodeURIComponent(params.name));

  if (!brand) {
    return notFound();
  }

  const previousImage = (await parent).openGraph?.images || [];

  return {
    title: brand.name ? upperFirst(brand.name) : decodedName,
    description: `Description ${brand?.name || decodedName}`,
    openGraph: {
      images: [{ url: brand.photo }, ...previousImage],
    },
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
