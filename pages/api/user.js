export default function handler(req, res) {
	res.status(200).json({
		name: 'Jimmy Jacob',
		email: 'jimjacob29.com',
		role: 'Admin',
		initials: 'JJ',
	});
}
