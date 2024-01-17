import { storage } from '@/config/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export type ProgressCallback = (progress: number) => void;
export type CompletionCallback = (downloadUrl: string) => void;

const uploadFiles = async (
	files: File[] | undefined,
	path: string,
	progressCallback?: ProgressCallback,
	completionCallback?: CompletionCallback
): Promise<string[]> => {
	if (!Array.isArray(files)) {
		return [];
	}

	const promises = files.map((file) => {
		const storageRef = ref(storage, `${path}/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		return new Promise<string>((resolve, reject) => {
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					progressCallback && progressCallback(progress);
				},
				(err) => {
					reject(err);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref)
						.then((downloadUrl) => {
							completionCallback && completionCallback(downloadUrl);
							resolve(downloadUrl);
						})
						.catch((err) => {
							reject(err);
						});
				}
			);
		});
	});

	try {
		const urls = await Promise.all(promises);
		return urls;
	} catch (error) {
		console.error('Error uploading files:', error);
		throw error;
	}
};

export default uploadFiles;
