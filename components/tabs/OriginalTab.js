
export default function OriginalTab({ fileName }) {
    return (
        <div className="h-full bg-gray-100  flex flex-col">
            <iframe 
                src={`/uploads/${fileName}`} 
                className="w-full h-full border-none"
                title="Original Document"
            />
        </div>
    );
}
