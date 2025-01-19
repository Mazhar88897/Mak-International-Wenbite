"use client"
import emailjs from "emailjs-com";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { UploadButton } from "../utils/uploadthing";
import Image from "next/image";

interface ContainerEntry {
  _id: string;
  containerNumber: string;
  formENumbers: string[];
  company: string;
  
  status: boolean;
  date: string;
  fileUrl: string
}

const companies = ["Maersk", "Hapag", "MSC", "CMA-CGM"];

export default function Home() {
  const [entries, setEntries] = useState<ContainerEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<ContainerEntry>>({});
  const [searchContainerNumber, setSearchContainerNumber] = useState("");
  const [searchFormENumber, setSearchFormENumber] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);




  const handleSubmit = async () => {
      // console.log( currentEntry.containerNumber)
  

    try {
      const response = await emailjs.send(
        "service_mg4ulkr",
        "template_p47nlzh",
        {
          container_no: currentEntry.containerNumber,
          form_e: currentEntry.formENumbers,
          company: currentEntry.company,
          date: currentEntry.date,
          status: currentEntry.status,
          image_url: currentEntry.fileUrl

        },
        "9ka_TbrHNmAaORuf7"
      );
      alert("Email sent successfully!");
      console.log("Success:", response.status, response.text);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email. Please try again later.");
    } finally {
    
    }
  };









  // Fetch JWT token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Fetch entries from the API
  const fetchEntries = async () => {
    const res = await fetch("/api/test", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setEntries(data);
    } else {
      console.error("Failed to fetch entries");
    }
  };

  useEffect(() => {
    if (token) {
      fetchEntries();
    }
  }, [token]);

  // Filter entries based on search fields
  const filteredEntries = entries.filter(
    (entry) =>
      (searchContainerNumber === "" || entry.containerNumber.includes(searchContainerNumber)) &&
      (searchFormENumber === "" || entry.formENumbers.some((num) => num.includes(searchFormENumber))) &&
      (searchDate === "" || entry.date.includes(searchDate))
  );

  // Handle adding a new entry
  const handleAddEntry = () => {
    setCurrentEntry({
      containerNumber: "",
      formENumbers: [""],
      company: companies[0],
      status: true,
      date: new Date().toISOString().split('T')[0], // Formats date as yyyy-MM-dd
      fileUrl: "",
    });
    
    setIsModalOpen(true);
  };

  const handleSaveEntry = async () => {
    if (!currentEntry.containerNumber) {
      setError("Container Number is required.");
      return;
    }
  
    const method = currentEntry._id ? "PUT" : "POST"; 
    const url = currentEntry._id ? `/api/test?_id=${currentEntry._id}` : "/api/test"; 
    console.log("currentEntry", currentEntry); // Ensure that fileUrl is present here
  
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(currentEntry), // Sending the whole entry, including fileUrl
    });
  
    if (res.ok) {
      fetchEntries();
      setIsModalOpen(false);
      setError("");
    } else {
      const errorResponse = await res.text();
      setError(`Failed to save entry. Response: ${errorResponse}`);
    }
  };
  

  // Handle editing an entry
  const handleEditEntry = (entry: ContainerEntry) => {
    setCurrentEntry(entry);
    setIsModalOpen(true);
  };

  const handleDownloadImage = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch the image");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = fileUrl.split("/").pop() || "downloaded-image"; // Get the file name from the URL or use a default name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); // Free memory
    } catch (error) {
      console.error("Error downloading the image:", error);
      alert("Failed to download the image. Please try again.");
    }
  };
  

  // Handle deleting an entry
  const handleDeleteEntry = async (_id: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete entry with ID: ${_id}?`);

    if (confirmed) {
      const res = await fetch(`/api/test?_id=${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchEntries();
      } else {
        console.error("Failed to delete entry");
        alert("Failed to delete entry.");
      }
    }
  };

  // Handle image upload
  const handleImageUpload = async (fileUrl: string) => {
    setCurrentEntry((prev) => ({ ...prev, fileUrl }));
  };

  const handleClientUploadComplete = (res: any) => {
    console.log("hi");
    console.log(res[0].url); // Ensure this is the correct format of the response
  
    // alert("hi");
  
    const imageUrl = res[0].url;
    if (imageUrl) {
      console.log("Uploaded Image URL:", imageUrl);
      setCurrentEntry((prev) => {
        const updatedEntry = { ...prev, fileUrl: imageUrl };
        console.log("Updated Current Entry: ", updatedEntry);
        return updatedEntry;
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Search Box:</h1>
      <div className="m-6 grid gap-4 grid-rows-3">
        <Input
          placeholder="Search Container Number"
          value={searchContainerNumber}
          onChange={(e) => setSearchContainerNumber(e.target.value)}
        />
        <Input
          placeholder="Search Form-E Number"
          value={searchFormENumber}
          onChange={(e) => setSearchFormENumber(e.target.value)}
        />
        <Input
          placeholder="Search Date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>
      <Button onClick={handleAddEntry}>Add Container Entry</Button>
      {error && <p className="text-red-500 mt-4">{error}</p>} 
      <div className="mt-6 grid gap-4">
        {filteredEntries.map((entry) => (
          <div key={entry._id} className="border p-4 rounded-md shadow-md">
            
            <p><strong>Container Number:</strong> {entry.containerNumber}</p>
            <p><strong>Form-E Numbers:</strong> {entry.formENumbers.join(", ")}</p>
            <p><strong>Company:</strong> {entry.company}</p>
            <p><strong>Date:</strong> {entry.date}</p>
            <p>
              <strong>Status:</strong>
              <span className={`px-2 py-1 rounded text-white ${entry.status ? "bg-green-500" : "bg-red-500"}`}>
                {entry.status ? "Submitted" : "Not Submitted"}
              </span>
            </p>
            <div className="mt-4 mb-4"> 
            <Image
      src={entry.fileUrl} // The URL of the uploaded image
      alt="Uploaded Preview"
      width={250} // Set width directly
      height={200} // Set height directly
      className="rounded-md" // Add Tailwind CSS class for rounded corners

    />
            </div>
            <div className="flex gap-2 mt-2">
              <Button onClick={() => handleEditEntry(entry)}>Edit</Button>
              <Button onClick={() => handleDownloadImage(entry.fileUrl)}>Download</Button>
              <Button onClick={() => handleDeleteEntry(entry._id)} variant="destructive">Delete</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4">
          <Input
            placeholder="Container Number"
            value={currentEntry.containerNumber || ""}
            onChange={(e) => setCurrentEntry((prev) => ({ ...prev, containerNumber: e.target.value }))}
          />
          {currentEntry.formENumbers?.map((num, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                placeholder={`Form-E Number ${index + 1}`}
                value={num}
                onChange={(e) => {
                  const updated = [...(currentEntry.formENumbers || [])];
                  updated[index] = e.target.value;
                  setCurrentEntry((prev) => ({ ...prev, formENumbers: updated }));
                }}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  const updated = (currentEntry.formENumbers || []).filter((_, i) => i !== index);
                  setCurrentEntry((prev) => ({ ...prev, formENumbers: updated }));
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={() => setCurrentEntry((prev) => ({
            ...prev,
            formENumbers: [...(prev.formENumbers || []), ""]
          }))}>
            Add Form-E Number
          </Button>

          <Select
            value={currentEntry.company}
            onValueChange={(value) => setCurrentEntry((prev) => ({ ...prev, company: value }))}
          >
            <SelectTrigger>{currentEntry.company || "Select Company"}</SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <UploadButton
  endpoint="imageUploader"
  onClientUploadComplete={handleClientUploadComplete}
  onUploadError={(error) => alert(`ERROR! ${error.message}`)}
/>


          {currentEntry.fileUrl && (
            <div className="mt-4">
              <Image
      src={currentEntry.fileUrl} // The URL of the uploaded image
      alt="Uploaded Preview"
      width={250} // Set width directly
      height={200} // Set height directly
      className="rounded-md" // Add Tailwind CSS class for rounded corners

    />
              {/* <img src={currentEntry.fileUrl} alt="Uploaded Preview" className="w-full h-auto rounded-md" /> */}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Switch
              checked={currentEntry.status}
              onCheckedChange={(checked) => setCurrentEntry((prev) => ({ ...prev, status: checked }))}
            />
            <span>Submitted</span>
          </div>

          <Button onClick={()=>{handleSaveEntry();
                                setIsModalOpen(false);
                                handleSubmit();
          }}>Save</Button>
        </div>
      </Modal>
    </div>
  );
}
