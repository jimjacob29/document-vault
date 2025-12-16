import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405).json({error: 'Method not allowed'});
	}

	const uploadDir = path.join(process.cwd(), 'public/uploads');

	try {
		if (!fs.existsSync(uploadDir)) {
			return res.status(200).json({documents: []});
		}

		const files = fs.readdirSync(uploadDir);

		const documents = files
			.map(file => {
				const filePath = path.join(uploadDir, file);
				const stats = fs.statSync(filePath);

				return {
					name: file,
					storedName: file,
					size: stats.size,
					path: `/uploads/${file}`,
					createdAt: stats.birthtime.toISOString(),
				};
			})
			.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

		return res.status(200).json({documents});
	} catch (error) {
		console.error('List documents error:', error);
		return res.status(500).json({error: 'Failed to list documents'});
	}
}
