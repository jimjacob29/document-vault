import React, {useState, useEffect, useRef} from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import DocumentList from '../components/DocumentList';
import {Upload, Loader2, AlertCircle} from 'lucide-react';
import {clsx} from 'clsx';

export default function Home() {
	const [documents, setDocuments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState(null);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef(null);

	const fetchDocuments = async () => {
		try {
			const res = await fetch('/api/documents');
			if (!res.ok) throw new Error('Failed to fetch documents');
			const data = await res.json();
			setDocuments(data?.documents);
		} catch (err) {
			setError(err?.message);
		} finally {
			setLoading(false);
		}
	};

	const handleDrag = e => {
		e?.preventDefault();
		e?.stopPropagation();
		if (e?.type === 'dragenter' || e?.type === 'dragover') {
			setIsDragging(true);
		} else if (e?.type === 'dragleave') {
			setIsDragging(false);
		}
	};

	const handleDrop = async e => {
		e?.preventDefault();
		e?.stopPropagation();
		setIsDragging(false);

		if (e?.dataTransfer?.files && e?.dataTransfer?.files[0]) {
			await handleUpload(e?.dataTransfer?.files[0]);
		}
	};

	const handleFileSelect = async e => {
		const file = e?.target?.files?.[0];
		if (file) {
			await handleUpload(file);
		}
	};

	const handleUpload = async file => {
		setUploading(true);
		setError(null);
		const formData = new FormData();
		formData.append('file', file);
		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});
			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || 'Upload failed');
			}
			await fetchDocuments();
		} catch (err) {
			setError(err?.message);
		} finally {
			setUploading(false);
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

	useEffect(() => {
		fetchDocuments();
	}, []);

	return (
		<Layout>
			<Head>
				<title>Documents - DocVault</title>
			</Head>

			<div className="flex flex-col space-y-8">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Documents</h1>
						<p className="text-gray-400  mt-1">
							Manage and analyze your uploaded files.
						</p>
					</div>
				</div>
				<div
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
					className={clsx(
						'border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer group select-none',
						isDragging
							? 'border-blue-500 bg-blue-900/20 '
							: 'border-zinc-800  hover:border-blue-400  bg-black/50 ',
					)}
					onClick={() => fileInputRef?.current?.click()}>
					<input
						type="file"
						ref={fileInputRef}
						className="hidden"
						onChange={handleFileSelect}
						accept=".txt,.md,.pdf,.json"
					/>

					<div
						className={clsx(
							'p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm transition-colors',
							isDragging
								? 'bg-blue-900/20 '
								: 'bg-zinc-900  group-hover:bg-blue-900/20 ',
						)}>
						{uploading ? (
							<Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
						) : (
							<Upload
								className={clsx(
									'w-8 h-8',
									isDragging
										? 'text-blue-400'
										: 'text-gray-400 group-hover:text-blue-500',
								)}
							/>
						)}
					</div>

					<h3 className="text-lg font-medium text-white ">
						{uploading
							? 'Uploading...'
							: isDragging
							? 'Drop file here'
							: 'Click or Drag & Drop to Upload'}
					</h3>
					<p className="text-gray-400 max-w-sm mx-auto mt-2 text-sm">
						Support for PDF, TXT, MD, JSON
					</p>
				</div>

				{error && (
					<div className="p-4 rounded-lg bg-red-900/20 text-red-200 border border-red-900/30 flex items-center">
						<AlertCircle className="w-5 h-5 mr-2 text-red-400" />
						{error}
					</div>
				)}

				{loading ? (
					<div className="flex justify-center py-12">
						<Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
					</div>
				) : (
					<DocumentList documents={documents} onRefresh={fetchDocuments} />
				)}
			</div>
		</Layout>
	);
}
