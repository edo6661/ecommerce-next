import { getProductByName } from "@/services/product";
import { getUserByExternalId, getUserById } from "@/services/user";
import { SignedIn, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

interface Props {
  params: { name: string };
}

const Product = async ({ params }: Props) => {
  const decodedName = decodeURIComponent(params.name);
  const encodedName = encodeURI(decodedName);

  const product = await getProductByName(decodedName);

  const self = await currentUser();
  const user = await getUserByExternalId(self?.id!);

  const isOwner = product?.ownerId === user?.id;
  return (
    <section>
      <p>product {decodedName}</p>
      {isOwner && <Link href={`/product/${encodedName}/edit`}>Edit</Link>}
    </section>
  );
};

export default Product;
