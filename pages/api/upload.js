import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
	api: {
		bodyParser: false,
	},
};

const uploadDir = path.join(process.cwd(), 'public/uploads');

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, {recursive: true});
}

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({error: 'Method not allowed'});
	}

	const form = formidable({
		uploadDir,
		keepExtensions: true,
		maxFileSize: 10 * 1024 * 1024,
	});

	try {
		const [fields, files] = await form.parse(req);
		const uploadedFile = files.file?.[0];

		if (!uploadedFile) {
			return res.status(400).json({error: 'No file uploaded'});
		}

		const originalName = uploadedFile.originalFilename;
		const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
		const newPath = path.join(uploadDir, cleanName);

		let finalPath = newPath;
		let finalName = cleanName;
		if (fs.existsSync(newPath)) {
			const timestamp = Date.now();
			finalName = `${timestamp}-${cleanName}`;
			finalPath = path.join(uploadDir, finalName);
		}

		fs.renameSync(uploadedFile.filepath, finalPath);

		return res.status(200).json({
			message: 'File uploaded successfully',
			file: {
				name: originalName,
				storedName: finalName,
				size: uploadedFile.size,
				type: uploadedFile.mimetype,
				path: `/uploads/${finalName}`,
				createdAt: new Date().toISOString(),
			},
		});
	} catch (error) {
		console.error('Upload error:', error);
		return res.status(500).json({error: 'File upload failed'});
	}
}
