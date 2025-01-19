// pages/index.tsx
"use client"

// pages/index.tsx
// pages/index.tsx

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { format } from 'date-fns';

interface ContainerEntry {
  id: number;
  containerNumber: string;
  formENumbers: string[];
  company: string;
  image?: File;
  submitted: boolean;
  date: string;
}

const companies = ["Maersk", "Hapag", "MSC", "CMA-CGM"];

export default function Home() {
  const [entries, setEntries] = useState<ContainerEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<ContainerEntry>>({});

  const [searchContainerNumber, setSearchContainerNumber] = useState('');
  const [searchFormENumber, setSearchFormENumber] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const filteredEntries = entries.filter(entry => (
    (searchContainerNumber === '' || entry.containerNumber.includes(searchContainerNumber)) &&
    (searchFormENumber === '' || entry.formENumbers.some(num => num.includes(searchFormENumber))) &&
    (searchDate === '' || entry.date.includes(searchDate))
  ));

  const handleAddEntry = () => {
    setCurrentEntry({
      id: Date.now(),
      containerNumber: '',
      formENumbers: [''],
      company: companies[0],
      submitted: false,
      date: format(new Date(), 'yyyy-MM-dd'),
    });
    setIsModalOpen(true);
  };

  const handleSaveEntry = () => {
    setEntries((prev) => {
      const existingIndex = prev.findIndex(e => e.id === currentEntry.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = currentEntry as ContainerEntry;
        return updated;
      }
      return [...prev, currentEntry as ContainerEntry];
    });
    setIsModalOpen(false);
  };

  const handleDeleteEntry = (id: number) => {
    setEntries((prev) => prev.filter(entry => entry.id !== id));
  };

  const handleInputChange = (field: keyof ContainerEntry, value: any) => {
    setCurrentEntry((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownloadImage = (imageFile?: File) => {
    if (imageFile) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(imageFile);
      link.download = imageFile.name;
      link.click();
    }
  };

  return (
    <div className="p-6">
        <h1>Search Box:</h1>
    <div className="m-6 grid gap-4 grid-rows-3">
        <Input placeholder="Search Container Number" value={searchContainerNumber} onChange={(e) => setSearchContainerNumber(e.target.value)} />
        <Input placeholder="Search Form-E Number" value={searchFormENumber} onChange={(e) => setSearchFormENumber(e.target.value)} />
        <Input placeholder="Search Date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
      </div>
      <Button onClick={handleAddEntry}>Add Container Entry</Button>
      <div className="mt-6 grid gap-4">
        {filteredEntries.map((entry) => (
          <div key={entry.id} className="border p-4 rounded-md shadow-md">

            <p><strong>Container Number:</strong> {entry.containerNumber}</p>
            <p><strong>Form-E Numbers:</strong> {entry.formENumbers.join(', ')}</p>
            <p><strong>Company:</strong> {entry.company}</p>
            <p><strong>Date:</strong> {entry.date}</p>
            <p><strong>Status:</strong> <span className={`px-2 py-1 rounded text-white ${entry.submitted ? 'bg-green-500' : 'bg-red-500'}`}>{entry.submitted ? 'Submitted' : 'Not Submitted'}</span></p>
            {entry.image && (
              <div>
                <img src={URL.createObjectURL(entry.image)} alt="Uploaded" className="w-48 h-48 object-cover mt-2" />
              </div>
            )}
            <div className="flex gap-2 mt-2">
              <Button onClick={() => { setCurrentEntry(entry); setIsModalOpen(true); }}>Edit</Button>
              {entry.image && (
                <Button onClick={() => handleDownloadImage(entry.image)}>Download Image</Button>
              )}
              <Button onClick={() => handleDeleteEntry(entry.id)} variant="destructive">Delete</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4 ">
          <Input
            placeholder="Container Number"
            value={currentEntry.containerNumber || ''}
            onChange={(e) => handleInputChange('containerNumber', e.target.value)}
          />
          {currentEntry.formENumbers?.map((num, index) => (
            <Input
              key={index}
              placeholder={`Form-E Number ${index + 1}`}
              value={num}
              onChange={(e) => {
                const updated = [...(currentEntry.formENumbers || [])];
                updated[index] = e.target.value;
                handleInputChange('formENumbers', updated);
              }}
            />
          ))}
          <Button onClick={() => handleInputChange('formENumbers', [...(currentEntry.formENumbers || []), ''])}>
            Add Form-E Number
          </Button>

          <Select
            value={currentEntry.company}
            onValueChange={(value) => handleInputChange('company', value)}
          >
            <SelectTrigger>{currentEntry.company || 'Select Company'}</SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleInputChange('image', e.target.files?.[0] || null)}
          />

          <div className="flex items-center gap-2">
            <Switch
              checked={currentEntry.submitted}
              onCheckedChange={(checked) => handleInputChange('submitted', checked)}
            />
            <span>{currentEntry.submitted ? 'Submitted' : 'Not Submitted'}</span>
          </div>

          <Button onClick={handleSaveEntry}>Save</Button>
        </div>
      </Modal>
    </div>
  );
}
