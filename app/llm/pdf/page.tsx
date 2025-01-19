"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for App Router
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import router from "next/router";

const allowedFileTypes = [
  "application/pdf",
  "text/plain",
  "text/csv",
  "application/msword",
];

const FileUploadCard: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const router = useRouter();

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter((file) =>
      allowedFileTypes.includes(file.type)
    );

    if (validFiles.length > 0) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
    } else {
      alert("Unsupported file type. Please upload a PDF, DOC, TXT, or CSV file.");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const validFiles = files.filter((file) =>
      allowedFileTypes.includes(file.type)
    );

    if (validFiles.length > 0) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
    } else {
      alert("Unsupported file type. Please upload a PDF, DOC, TXT, or CSV file.");
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  const handlePostData = async (): Promise<void> => {
    const url = 'http://127.0.0.1:5000/process_docs'; // Replace with your actual endpoint
    const data = new FormData();

    // Append all uploaded files under the 'files' key
    uploadedFiles.forEach((file) => {
        data.append('files', file);
    });

    try {
        // Make the POST request
        const response = await fetch(url, {
            method: 'POST',
            body: data,
        });

        // Check if the response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const result = await response.json();
        console.log('Response from server:', result);

        // Handle success case
        if (result.message) {
            console.log(result.message);
        } else {
            console.log('Unexpected server response:', result);
        }
    } catch (error) {
        console.error('Error posting data:', error);
        console.log('Failed to post data. Please try again.');
    }
};

  return (

    <div className="flex flex-col items-center    min-h-screen p-6">
      {/* Card Container */}
      <div className="w-full max-w-xl p-6 bg-white shadow-lg rounded-lg">
        {/* Card Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Upload Your Files
          </h1>
          <p className="text-gray-500 mt-2">
            Drag and drop files or click to upload. Only PDF, DOC, TXT, or CSV
            files are allowed.
          </p>
        </div>

        {/* Drag-and-Drop Area */}
       <div><div
  className="mt-6 flex items-center justify-center w-full  h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
  onDrop={(e) => {
    e.preventDefault();
    e.stopPropagation(); // Stops propagation beyond this element
    handleFileDrop(e); // Process files
  }}
  onDragOver={(e) => {
    e.preventDefault();
    e.stopPropagation(); // Stops propagation beyond this element
  }}
>
  <label className="text-center w-full h-full flex flex-col items-center justify-center relative cursor-pointer">
    <FiUploadCloud size={40} className="mx-auto text-gray-400" />
    <p className="text-gray-600 font-medium">Drag and drop files here</p>
    <p className="text-sm text-gray-500">or click to browse</p>
    {/* The input is hidden but still functional */}
    <input
      type="file"
      multiple
      accept={allowedFileTypes.join(",")}
      onChange={handleFileInput}
      className="absolute inset-0 opacity-0"
    />
  </label>
</div>
</div>
<div>
<button
         onClick={handlePostData}
          className="mt-4 w-full px-4 py-2 bg-black text-white rounded-md shadow"
        >
          Create Chatbot
        </button>
</div>
<div className="h-32 overflow-y-scroll " >{uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700">
              Uploaded Files
            </h3>
            <ul className="mt-2 space-y-2">
              {uploadedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded-md shadow-sm"
                >
                  <span className="text-gray-800">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
</div>
        {/* Uploaded Files */}
        
        {/* Next Button */}
        
      </div>
     
      
    </div>
  );
};

 
 function page() {
    return (
      <main className="p-4 lg:p-8">
        <h1 className="text-2xl font-bold">Document Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome to your dashboard. Here you can manage your documents.
        </p>
        <div className="mt-8">
          <FileUploadCard />
        </div>
        
      </main>
    );
  }
  
  export default page;