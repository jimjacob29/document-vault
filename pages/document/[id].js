import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import Layout from '../../components/Layout';
import {
	Sparkles,
	ArrowLeft,
	Download,
	RefreshCw,
	FileCode,
	AlignLeft,
} from 'lucide-react';
import {clsx} from 'clsx';
import Loader from '../../components/Loader';
import SummaryTab from '../../components/tabs/SummaryTab';
import MarkdownTab from '../../components/tabs/MarkdownTab';
import OriginalTab from '../../components/tabs/OriginalTab';
import {toast} from 'sonner';

export default function DocumentView() {
	const router = useRouter();
	const {id} = router.query;
	const fileName = id ? decodeURIComponent(id) : null;

	const [activeTab, setActiveTab] = useState('overview'); // overview, markdown, original
	const [processing, setProcessing] = useState(false);
	const [processedData, setProcessedData] = useState(null);
	const [loading, setLoading] = useState(true);

	const tabs = [
		{id: 'overview', label: 'AI Summary', icon: Sparkles},
		{id: 'markdown', label: 'Markdown', icon: FileCode},
		{id: 'original', label: 'Original File', icon: AlignLeft},
	];

	const handleProcess = async () => {
		setProcessing(true);
		const toastId = toast.loading('Analyzing document with AI...');
		try {
			const res = await fetch('/api/process', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({filePath: fileName}),
			});
			if (!res.ok) throw new Error('Processing failed');
			const data = await res.json();
			setProcessedData(data);
			setActiveTab('overview');
			toast.success('Analysis complete!', {id: toastId});
		} catch (err) {
			console.error(err);
			toast.error('Failed to analyze document', {id: toastId});
		} finally {
			setProcessing(false);
		}
	};

	useEffect(() => {
		if (!fileName) return;
		setLoading(false);
	}, [fileName]);
	if (!fileName) return null;

	return (
		<Layout>
			<Head>
				<title>{fileName} - DocVault</title>
			</Head>

			<div className="flex flex-col h-[calc(100vh-8rem)]">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center">
						<button
							onClick={() => router?.back()}
							className="mr-4 p-2 rounded-full hover:bg-zinc-800  transition-colors">
							<ArrowLeft className="w-5 h-5 text-gray-400" />
						</button>
						<div>
							<h1 className="text-2xl font-bold truncate max-w-xl">
								{fileName}
							</h1>
							<p className="text-sm text-gray-400">Document Analysis</p>
						</div>
					</div>

					<div className="flex space-x-3">
						{processedData && (
							<button
								onClick={() => {
									const blob = new Blob([processedData?.markdown], {
										type: 'text/markdown',
									});
									const url = URL.createObjectURL(blob);
									const a = document.createElement('a');
									a.href = url;
									a.download = `${fileName}.md`;
									a.click();
								}}
								className="px-4 py-2 text-sm font-medium text-gray-300 bg-zinc-900 border border-gray-300 rounded-lg hover:bg-black     flex items-center">
								<Download className="w-4 h-4 mr-2" />
								Export MD
							</button>
						)}

						{!processedData ? (
							<button
								onClick={handleProcess}
								disabled={processing}
								className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center shadow-sm disabled:opacity-50">
								{processing ? (
									<Loader className="w-4 h-4 mr-2" />
								) : (
									<Sparkles className="w-4 h-4 mr-2" />
								)}
								{processing ? 'Analyzing...' : 'Generate AI Summary'}
							</button>
						) : (
							<button
								onClick={handleProcess}
								disabled={processing}
								className="px-4 py-2 text-sm font-medium text-blue-400 bg-blue-900/20 border border-blue-200 rounded-lg hover:bg-blue-100    flex items-center">
								<RefreshCw className="w-4 h-4 mr-2" />
								Re-Analyze
							</button>
						)}
					</div>
				</div>
				<div className="border-b border-zinc-800  mb-6">
					<nav className="-mb-px flex space-x-8">
						{tabs?.map(tab => {
							const isActive = activeTab === tab?.id;
							return (
								<button
									key={tab?.id}
									onClick={() => setActiveTab(tab?.id)}
									className={clsx(
										'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center',
										isActive
											? 'border-blue-500 text-blue-400'
											: 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300',
									)}>
									<tab.icon
										className={clsx(
											'w-4 h-4 mr-2',
											isActive ? 'text-blue-500' : 'text-gray-400',
										)}
									/>
									{tab?.label}
								</button>
							);
						})}
					</nav>
				</div>
				<div className="flex-1 bg-zinc-900  rounded-xl border border-zinc-800  shadow-sm overflow-hidden relative">
					{activeTab === 'overview' && (
						<SummaryTab
							processedData={processedData}
							onProcess={handleProcess}
							processing={processing}
						/>
					)}

					{activeTab === 'markdown' && (
						<MarkdownTab processedData={processedData} />
					)}

					{activeTab === 'original' && <OriginalTab fileName={fileName} />}
					{processing && (
						<div className="absolute inset-0 bg-zinc-900/80  backdrop-blur-sm flex items-center justify-center z-10">
							<div className="text-center">
								<Loader className="w-10 h-10 text-blue-400 mx-auto mb-4" />
								<h3 className="text-lg font-medium text-white ">
									Analyzing Document...
								</h3>
								<p className="text-gray-400">
									Extracting insights and formatting content
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
}
