import { db } from '@/lib/database';
import { getSelf } from '../user';

export const isFollowingUser = async (id: string) => {
	try {
		const self = await getSelf();

		const otherUser = await db.user.findUnique({
			where: { id },
		});

		if (!otherUser) throw new Error('User not found');

		// ! nandain kalo user gabisa follow dirisendiri.

		if (otherUser.id === self.id) return true;

		// ! kalo self udah ngikutin otherUser, maka nge return true kalo belum akan nge return false
		const existingFollow = await db.follow.findFirst({
			where: {
				followerId: self.id,
				followingId: otherUser.id,
			},
		});

		return !!existingFollow;
	} catch {
		return false;
	}
};

export const followUser = async (id: string) => {
	const self = await getSelf();

	const otherUser = await db.user.findUnique({
		where: { id },
	});

	if (!otherUser) throw new Error('User not found');

	if (otherUser.id === self.id) throw new Error('Cannot follow yourself');

	const existingFollow = await db.follow.findUnique({
		where: {
			followerId_followingId: {
				followerId: self.id,
				followingId: otherUser.id,
			},
		},
	});

	if (existingFollow) throw new Error('Already following');

	const follow = await db.follow.create({
		data: {
			followerId: self.id,
			followingId: otherUser.id,
		},
		// ! include in this case itu agar return user yang sudah di follow dan user yang nge follow(self)?

		include: {
			following: true,
		},
	});

	return follow;
};

export const unfollowUser = async (id: string) => {
	const self = await getSelf();
	const otherUser = await db.user.findUnique({
		where: { id },
	});
	if (!otherUser) throw new Error('User not found');
	if (otherUser.id === self.id) throw new Error('Cannot unfollow urself');

	const existingFollow = await db.follow.findUnique({
		where: {
			followerId_followingId: {
				followerId: self.id,
				followingId: otherUser.id,
			},
		},
	});

	// ! gabisa nge unfollow otherUser yang belum self follow
	if (!existingFollow) throw new Error('Not following');

	const follow = await db.follow.delete({
		where: {
			id: existingFollow.id,
		},
		include: {
			following: true,
		},
	});
	return follow;
};
