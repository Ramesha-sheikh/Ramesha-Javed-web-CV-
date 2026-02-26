export default function PDFViewer() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">PDF CV Viewer</h1>
        <p className="mb-4 text-gray-600">
          Yeh PDF dekho aur mujhe describe karo - main exactly waisa web CV bana dunga!
        </p>
        <iframe
          src="/humaiza.pdf"
          className="w-full h-[800px] border-2 border-gray-300 rounded"
          title="CV PDF"
        />
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h2 className="font-bold mb-2">Mujhe batao:</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Header ka color kya hai?</li>
            <li>Sidebar hai ya single column?</li>
            <li>Main sections kya hain?</li>
            <li>Font style formal hai ya modern?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
