import React from 'react';
import {Sparkles} from 'lucide-react';
import Loader from '../Loader';

export default function SummaryTab({processedData, onProcess, processing}) {
	return (
		<div className="h-full overflow-auto p-8">
			{!processedData ? (
				<div className="h-full flex flex-col items-center justify-center text-center">
					<div className="bg-indigo-900/20  p-4 rounded-full mb-4">
						<Sparkles className="w-8 h-8 text-indigo-400" />
					</div>
					<h3 className="text-lg font-medium">Ready to Analyze</h3>
					<p className="text-gray-400 max-w-md mt-2 mb-6">
						Click the button above to generate a summary and extract insights
						from this document using AI.
					</p>
					<button
						onClick={onProcess}
						disabled={processing}
						className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors disabled:opacity-50">
						{processing ? 'Processing...' : 'Start Analysis'}
					</button>
				</div>
			) : (
				<div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<div className="bg-blue-900/20  p-6 rounded-xl border border-blue-800 ">
						<h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400  mb-3 flex items-center">
							<Sparkles className="w-4 h-4 mr-2" />
							Executive Summary
						</h3>
						<p className="text-lg leading-relaxed text-blue-100 ">
							{processedData?.summary}
						</p>
					</div>

					<div className="prose prose-invert  max-w-none">
						<h3>Key Insights</h3>
						<p>See the markdown view for full detailed structure.</p>
					</div>
				</div>
			)}
		</div>
	);
}
