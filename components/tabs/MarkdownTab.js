
export default function MarkdownTab({ processedData }) {
    return (
        <div className="h-full overflow-auto bg-black  p-0 flex">
                {!processedData ? (
                <div className="m-auto text-center text-gray-400">
                    No markdown generated yet. Processing required.
                </div>
                ) : (
                <pre className="p-8 font-mono text-sm w-full overflow-auto text-gray-300 ">
                    {processedData?.markdown}
                </pre>
                )}
        </div>
    );
}
