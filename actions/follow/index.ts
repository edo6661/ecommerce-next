'use server';

import { db } from '@/lib/database';
import { followUser, unfollowUser } from '@/services/follow';
import { getSelf } from '@/services/user';
import { revalidatePath } from 'next/cache';

export const onFollow = async (id: string) => {
	try {
		const followedUser = await followUser(id);

		revalidatePath('/');

		if (followedUser) revalidatePath(`/${followedUser.following.username}`);

		return followedUser;
	} catch (err) {
		throw new Error('Internal Error');
	}
};

export const onUnfollow = async (id: string) => {
	try {
		const unfollowedUser = await unfollowUser(id);

		if (unfollowedUser) revalidatePath(`/${unfollowedUser.following.username}`);

		return unfollowedUser;
	} catch {
		throw new Error('Internal Error');
	}
};

export const getFollowedUsers = async () => {
	try {
		const self = await getSelf();
		const followedUsers = await db.follow.findMany({
			where: {
				followerId: self.id,
			},
			include: {
				following: true,
			},
		});
		return followedUsers;
	} catch {
		return [];
	}
};
