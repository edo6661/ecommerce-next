import { db } from '@/lib/database';

export const getCategory = async () => {
	return db.category.findMany({}).catch((err) => {
		console.error(err);
		throw new Error('failed to fetch category');
	});
};
