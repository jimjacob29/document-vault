import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {FileText, MoreVertical, Calendar, HardDrive} from 'lucide-react';
import Modal from './Modal';
import {formatBytes} from '../utils/formatBytes';
import {toast} from 'sonner';

export default function DocumentList({documents, onRefresh}) {
	const [activeMenu, setActiveMenu] = useState(null);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [fileToDelete, setFileToDelete] = useState(null);

	const initiateDelete = (e, fileName) => {
		e?.preventDefault();
		e?.stopPropagation();
		setFileToDelete(fileName);
		setDeleteModalOpen(true);
		setActiveMenu(null);
	};

	const confirmDelete = async () => {
		if (!fileToDelete) return;
		const toastId = toast.loading('Deleting document...');
		try {
			const res = await fetch(
				`/api/documents/${encodeURIComponent(fileToDelete)}`,
				{
					method: 'DELETE',
				},
			);
			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || 'Failed to delete');
			}
			if (onRefresh) onRefresh();
			toast.success('Document deleted', {id: toastId});
		} catch (err) {
			toast.error('Failed to delete document', {id: toastId});
		} finally {
			setFileToDelete(null);
			setDeleteModalOpen(false);
		}
	};

	const toggleMenu = (e, index) => {
		e?.preventDefault();
		e?.stopPropagation();
		setActiveMenu(activeMenu === index ? null : index);
	};

	useEffect(() => {
		const handleClickOutside = () => setActiveMenu(null);
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, []);
	if (!documents?.length) return null;

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
				{documents?.map((doc, idx) => (
					<Link
						key={doc?.path}
						href={`/document/${encodeURIComponent(doc?.storedName)}`}
						className="group block bg-zinc-900  border border-zinc-800  rounded-xl hover:shadow-lg hover:border-blue-500/30 transition-all duration-200 overflow-hidden relative">
						<div className="p-5">
							<div className="flex justify-between items-start">
								<div className="p-2 bg-blue-900/20  rounded-lg text-blue-400  group-hover:bg-blue-600 group-hover:text-white transition-colors">
									<FileText className="w-6 h-6" />
								</div>
								<div className="relative">
									<button
										onClick={e => toggleMenu(e, idx)}
										className="p-1 text-gray-400 hover:text-gray-600  rounded-full hover:bg-zinc-800  transition-colors">
										<MoreVertical className="w-5 h-5" />
									</button>
									{activeMenu === idx && (
										<div className="absolute right-0 mt-2 w-48 bg-zinc-900  rounded-lg shadow-xl border border-gray-100  z-10 py-1 animation-fade-in">
											<button
												onClick={e => initiateDelete(e, doc?.storedName)}
												className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20  transition-colors flex items-center">
												Delete Document
											</button>
										</div>
									)}
								</div>
							</div>

							<h3
								className="mt-4 font-semibold text-lg truncate"
								title={doc?.name}>
								{doc?.name}
							</h3>

							<div className="mt-4 flex items-center justify-between text-xs text-gray-400 ">
								<div className="flex items-center">
									<Calendar className="w-3.5 h-3.5 mr-1" />
									{new Date(doc?.createdAt)?.toLocaleDateString?.()}
								</div>
								<div className="flex items-center">
									<HardDrive className="w-3.5 h-3.5 mr-1" />
									{formatBytes(doc?.size)}
								</div>
							</div>
						</div>
						<div className="bg-black  px-5 py-3 border-t border-gray-100  flex items-center justify-between text-xs font-medium text-blue-400  opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
							<span>View Analysis</span>
							<span>&rarr;</span>
						</div>
					</Link>
				))}
			</div>

			<Modal
				isOpen={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				onConfirm={confirmDelete}
				title="Delete Document"
				message={`Are you sure you want to delete "${fileToDelete}"? This action cannot be undone.`}
				isDangerous={true}
				confirmText="Delete"
			/>
		</>
	);
}
