import { isFollowingUser } from "@/services/follow";
import { getUserByUsername } from "@/services/user";
import { notFound } from "next/navigation";
import FollowActions from "./_components/actions";
import { currentUser } from "@clerk/nextjs";
import { upperFirst } from "@/helpers";
import { getProductsByOwnerId } from "@/services/product";
import ProductSwiper from "../product/_components/ProductSwiper";
import Title from "@/components/shared/Title";
import { Metadata, ResolvingMetadata } from "next";
import { Separator } from "@/components/ui/separator";

interface Props {
  params: { username: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const user = await getUserByUsername(decodeURIComponent(params.username));
  if (!user) {
    return notFound();
  }
  const previousImage = (await parent).openGraph?.images || [];
  return {
    title: upperFirst(params.username),
    description: `Description ${params.username}`,
    openGraph: {
      images: [{ url: user.profilePhoto }, ...previousImage],
    },
  };
}

const UserPage = async ({ params }: Props) => {
  const user = await getUserByUsername(params.username);
  const self = await currentUser();
  if (!user) return notFound();
  const isFollowing = await isFollowingUser(user.id);
  const isOwner = user.externalUserId === self?.id;

  const ownerProducts = await getProductsByOwnerId(user.id);

  return (
    <section className="container space-y-8">
      <div>
        <Title label={upperFirst(user.username)} />
        <Separator className="mb-4" />
        {!isOwner && (
          <FollowActions userId={user.id} isFollowing={isFollowing} />
        )}
      </div>
      <ProductSwiper ownerProducts={ownerProducts} />
    </section>
  );
};

export default UserPage;
