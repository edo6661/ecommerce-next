import { isFollowingUser } from "@/services/follow"
import { getUserByUsername } from "@/services/user"
import { notFound } from "next/navigation"
import FollowActions from "./_components/actions"

const UserPage = async ({ params }: { params: { username: string } }) => {
    const user = await getUserByUsername(params.username)
    if (!user) return notFound()
    const isFollowing = await isFollowingUser(user.id)
    return (
        <section className="container">
            <p>{user.username}</p>
            <p>is following {`${isFollowing}`}</p>
            <FollowActions userId={user.id} isFollowing={isFollowing} />
        </section>
    )
}

export default UserPage