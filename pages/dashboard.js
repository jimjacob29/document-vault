import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import {PieChart, HardDrive, FileText, File} from 'lucide-react';
import Loader from '../components/Loader';
import {formatBytes} from '../utils/formatBytes';

export default function Dashboard() {
	const [loading, setLoading] = useState(true);
	const [stats, setStats] = useState({
		totalDocs: 0,
		totalSize: 0,
		typeDistribution: {},
	});

	const fetchDocuments = async () => {
		try {
			const res = await fetch('/api/documents');
			const data = await res.json();
			if (data?.documents) {
				calculateStats(data?.documents);
			}
		} catch (error) {
			console.error('Failed to fetch stats', error);
		} finally {
			setLoading(false);
		}
	};

	const calculateStats = docs => {
		const totalDocs = docs?.length;
		const totalSize = docs?.reduce((acc, doc) => acc + doc?.size, 0);

		const typeDistribution = {};
		docs.forEach(doc => {
			const ext = doc?.name?.split?.('.')?.pop()?.toLowerCase();
			typeDistribution[ext] = (typeDistribution[ext] || 0) + 1;
		});

		setStats({totalDocs, totalSize, typeDistribution});
	};

	useEffect(() => {
		fetchDocuments();
	}, []);

	return (
		<Layout>
			<Head>
				<title>Dashboard - DocVault</title>
			</Head>

			<div className="mb-8">
				<h1 className="text-3xl font-bold text-white ">Dashboard</h1>
				<p className="text-gray-400 mt-2">Overview of your document vault.</p>
			</div>

			{loading ? (
				<div className="flex justify-center py-20">
					<Loader className="w-8 h-8 text-blue-400" />
				</div>
			) : (
				<div className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-zinc-900  p-6 rounded-xl border border-zinc-800  shadow-sm">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-sm font-medium text-gray-400 ">
									Total Documents
								</h3>
								<div className="p-2 bg-blue-900/20  rounded-lg text-blue-400">
									<FileText className="w-5 h-5" />
								</div>
							</div>
							<p className="text-3xl font-bold text-white ">
								{stats?.totalDocs}
							</p>
						</div>

						<div className="bg-zinc-900  p-6 rounded-xl border border-zinc-800  shadow-sm">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-sm font-medium text-gray-400 ">
									Total Storage
								</h3>
								<div className="p-2 bg-green-50  rounded-lg text-green-600">
									<HardDrive className="w-5 h-5" />
								</div>
							</div>
							<p className="text-3xl font-bold text-white ">
								{formatBytes(stats?.totalSize)}
							</p>
						</div>

						<div className="bg-zinc-900  p-6 rounded-xl border border-zinc-800  shadow-sm">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-sm font-medium text-gray-400 ">
									File Types
								</h3>
								<div className="p-2 bg-purple-50  rounded-lg text-purple-600">
									<PieChart className="w-5 h-5" />
								</div>
							</div>
							<div className="text-sm">
								{Object.entries(stats?.typeDistribution || {})?.map(
									([type, count]) => (
										<div
											key={type}
											className="flex justify-between items-center mb-1">
											<span className="uppercase font-medium text-gray-400 ">
												{type}
											</span>
											<span className="font-bold text-white ">{count}</span>
										</div>
									),
								)}
								{!Object.keys(stats?.typeDistribution || {}).length && (
									<p className="text-gray-400 italic">No files yet</p>
								)}
							</div>
						</div>
					</div>
					<div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
						<h2 className="text-2xl font-bold mb-4">Start Analyzing</h2>
						<p className="mb-6 max-w-xl text-blue-100">
							Upload your documents to the Vault and let our AI extract key
							insights, summaries, and markdown content instantly.
						</p>
					</div>
				</div>
			)}
		</Layout>
	);
}
