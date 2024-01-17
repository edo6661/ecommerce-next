import { currentUser } from '@clerk/nextjs';
import { db } from '../../lib/database/index';

export const getUserByUsername = async (username: string) => {
	try {
		const user = await db.user.findUnique({
			where: {
				username,
			},
		});
		return user;
	} catch (err) {
		console.error(err);
	}
};

export const getSelfByUsername = async (username: string) => {
	const self = await currentUser();
	if (!self || !self.username) {
		throw new Error('Unauthorized');
	}
	return getUserByUsername(username);
};
// ! apk akan break kalo ga ada self
export const getSelf = async () => {
	const self = await currentUser();
	if (!self || !self.username) throw new Error('Unauthorized');
	const user = await db.user.findUnique({
		where: { externalUserId: self.id },
	});
	if (!user) throw new Error('Not Found');
	return user;
};

export const getRecommended = async () => {
	let userId;

	try {
		const self = await getSelf();
		userId = self.id;
	} catch {
		userId = null;
	}

	let users = [];

	if (userId) {
		users = await db.user.findMany({
			where: {
				NOT: { id: userId },
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	} else {
		users = await db.user.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	return users;
};
