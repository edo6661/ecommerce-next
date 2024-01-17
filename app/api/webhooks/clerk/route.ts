import { db } from '@/lib/database';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

export async function POST(req: Request) {
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
		);
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get('svix-id');
	const svix_timestamp = headerPayload.get('svix-timestamp');
	const svix_signature = headerPayload.get('svix-signature');

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Error occured -- no svix headers', {
			status: 400,
		});
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error('Error verifying webhook:', err);
		return new Response('Error occured', {
			status: 400,
		});
	}

	// Get the ID and type
	// const { id } = evt.data;
	const eventType = evt.type;

	if (eventType === 'user.created') {
		await db.user.create({
			data: {
				externalUserId: payload.data.id,
				username: payload.data.username,
				profilePhoto: payload.data.image_url,
				coverPhoto:
					'https://i.pinimg.com/564x/72/f6/ae/72f6ae0fe0ade2b9343b8eafe857474e.jpg',
				bio: `${payload.data.username} default bio by mugi-chan`,
			},
		});
	}
	if (eventType === 'user.updated') {
		await db.user.update({
			where: {
				// ! karena di create kita nge store nya itu payload.data.id
				externalUserId: payload.data.id,
			},
			data: {
				username: payload.data.username,
				profilePhoto: payload.data.image_url,
			},
		});
	}
	if (eventType === 'user.deleted') {
		await db.user.delete({
			where: {
				externalUserId: payload.data.id,
			},
		});
	}

	// ! untuk testing purpose di clerk
	// console.log(`Webhook with and ID of ${id} and type of ${eventType}`);

	return new Response('', { status: 200 });
}
