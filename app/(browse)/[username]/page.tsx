import { isFollowingUser } from "@/services/follow";
import { getUserByUsername } from "@/services/user";
import { notFound } from "next/navigation";
import FollowActions from "./_components/actions";
import { currentUser } from "@clerk/nextjs";
import { upperFirst } from "@/helpers";
import { getProductsByOwnerId } from "@/services/product";
import ProductSwiper from "../product/_components/ProductSwiper";
import Title from "@/components/shared/Title";

const UserPage = async ({ params }: { params: { username: string } }) => {
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
        {!isOwner && (
          <FollowActions userId={user.id} isFollowing={isFollowing} />
        )}
      </div>
      <ProductSwiper ownerProducts={ownerProducts} />
    </section>
  );
};

export default UserPage;
