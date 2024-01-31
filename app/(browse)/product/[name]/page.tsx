import { truncateWord, upperFirst } from "@/helpers";
import { getCategoryById } from "@/services/category";
import { getProductByName, getProductsByOwnerId } from "@/services/product";
import { getUserByExternalId, getUserById } from "@/services/user";
import { SignedIn, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import {
  FaCaretRight,
  FaClock,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import BreadcrumbProduct from "../_components/BreadcrumbProduct";
import Image from "next/image";
import SwiperImageProduct from "../_components/SwiperImageProduct";
import Title from "@/components/shared/Title";
import MobileSliderProduct from "../_components/MobileSliderProduct";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProfilePhotoProduct from "../_components/ProfilePhotoProduct";
import ProductSwiper from "../_components/ProductSwiper";
import PhotosRatingCustomer from "../_components/PhotosRatingCustomer";
import RatingConclusion from "../_components/RatingConclusion";
import SpecificProduct from "../_components/SpecificProduct";
import DetailProfilePhotoProduct from "../_components/DetailProfilePhotoProduct";
import BottomSectionProduct from "../_components/BottomSectionProduct";
import FormBuyProduct from "../_components/FormBuyProduct";
interface Props {
  params: { name: string };
}

const Product = async ({ params }: Props) => {
  const decodedName = decodeURIComponent(params.name);
  const product = await getProductByName(decodedName);
  const self = await currentUser();
  const user = await getUserByExternalId(self?.id!);
  const category = await getCategoryById(product?.categoryId!);
  const owner = await getUserById(product?.ownerId!);
  const ownerProducts = await getProductsByOwnerId(owner?.id!);

  const isOwner = product?.ownerId === user?.id;
  const imageProduct = product?.photos.split(",")!;

  return (
    <section className="container py-4 space-y-4">
      <BreadcrumbProduct
        productName={decodedName}
        categoryName={category?.name!}
      />
      <article className=" sm:grid sm:grid-cols-5 gap-6">
        <div className=" containerSwiperProduct">
          <SwiperImageProduct name={decodedName} imageUrls={imageProduct} />
          <FormBuyProduct
            quantity={product?.quantity!}
            price={product?.price!}
          />
          <RatingConclusion />
        </div>
        <div className="sm:hidden block">
          <MobileSliderProduct name={decodedName} imageUrls={imageProduct} />
        </div>
        {/* ! tata yang bener TODO */}
        <div className=" sm:col-span-3 px-4">
          <SpecificProduct
            price={product?.price!}
            discountPrice={product?.discountPrice!}
            decodedName={decodedName!}
            description={product?.description!}
          />
          <div className="  flex gap-4 pb-4">
            <ProfilePhotoProduct owner={owner!} />
          </div>
          <div className="fl-center justify-between ">
            <DetailProfilePhotoProduct />
          </div>
          <Separator />
          <BottomSectionProduct
            ownerProducts={ownerProducts}
            username={owner?.username!}
          />
        </div>
      </article>
      {/* {isOwner && <Link href={`/product/${encodedName}/edit`}>Edit</Link>} */}
    </section>
  );
};

export default Product;
