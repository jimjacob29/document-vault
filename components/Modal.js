import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {X} from 'lucide-react';
import {clsx} from 'clsx';

export default function Modal({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	isDangerous = false,
}) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	if (!mounted || !isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>
			<div
				className={clsx(
					'bg-zinc-900  rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden',
				)}>
				<div className="flex items-center justify-between p-6 border-b border-gray-100 ">
					<h3 className="text-lg font-semibold text-white ">{title}</h3>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-400  transition-colors">
						<X className="w-5 h-5" />
					</button>
				</div>

				<div className="p-6">
					<p className="text-gray-300 ">{message}</p>
				</div>

				<div className="flex items-center justify-end gap-3 p-6 bg-black ">
					<button
						onClick={onClose}
						className="px-4 py-2 text-sm font-medium text-gray-300  hover:bg-zinc-800  rounded-lg transition-colors">
						{cancelText}
					</button>
					<button
						onClick={() => {
							onConfirm();
						}}
						className={clsx(
							'px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2',
							isDangerous
								? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
								: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
						)}>
						{confirmText}
					</button>
				</div>
			</div>
		</div>,
		document.body,
	);
}
