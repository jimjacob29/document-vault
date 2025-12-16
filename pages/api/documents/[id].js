import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
	const {id} = req.query;
	const fileName = id;

	const uploadDir = path.join(process.cwd(), 'public/uploads');
	const filePath = path.join(uploadDir, fileName);

	if (req.method === 'DELETE') {
		try {
			if (!fs.existsSync(filePath)) {
				return res.status(404).json({error: 'File not found'});
			}

			fs.rmSync(filePath, {force: true, recursive: true});
			return res.status(200).json({message: 'File deleted successfully'});
		} catch (error) {
			console.error('Delete error:', error);
			console.error('Attempted valid path:', filePath);
			console.error('CWD:', process.cwd());
			return res
				.status(500)
				.json({error: 'Failed to delete file', details: error.message});
		}
	}

	return res.status(405).json({error: 'Method not allowed'});
}
