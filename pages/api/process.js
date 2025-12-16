export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({error: 'Method not allowed'});
	}

	const {filePath} = req.body;

	if (!filePath) {
		return res.status(400).json({error: 'File path required'});
	}

	await new Promise(resolve => setTimeout(resolve, 1500));

	const mockSummary =
		'This document appears to be a technical specification or a project guide. It outlines key requirements, installation steps, and architectural decisions. The tone is informative and structured.';

	const mockMarkdown = `
# Processed Document

## Overview
This is a **generated markdown version** of the uploaded document. The original content has been analyzed and restructured for clarity.

## Key Points
- **Architecture**: Modern web stack with Next.js.
- **Features**: File upload, processing, and visualization.
- **AI Integration**: Currently using a mock service for demonstration.

## Detailed Content
The content of the document is preserved here in markdown format. 
* List item 1
* List item 2
* List item 3

> "This is a pulled quote from the document."

## Conclusion
The document provides a solid foundation for the project.
  `;

	return res.status(200).json({
		summary: mockSummary,
		markdown: mockMarkdown,
		status: 'completed',
	});
}
