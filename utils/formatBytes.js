export const formatBytes = (bytes, decimals = 2) => {
	if (!+bytes) return '0 Bytes';
	const kibi = 1024;
	const correctedDecimals = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(bytes) / Math.log(kibi));
	return `${parseFloat(
		(bytes / Math.pow(kibi, i)).toFixed(correctedDecimals),
	)} ${sizes[i]}`;
};
