'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import router from "next/router";

 function CardWithForm() {
  const [tests, setTests] = React.useState<string[]>([]);
  const [testName, setTestName] = React.useState("");

  // Function to add test
  const addTest = () => {
    if (testName.trim()) {
      setTests([...tests, testName.trim()]);
      setTestName("");
    }
  };

  // Function to remove a specific test
  const removeTest = (index: number) => {
    const updatedTests = tests.filter((_, i) => i !== index);
    setTests(updatedTests);
  };

  // Function to clear all tests
  const clearAllTests = () => {
    setTests([]);
  };
  type ApiResponse = {
    success: boolean;
    message: string;
  };

  // Function to truncate text
  const truncateText = (text: string) => {
    const words = text.split(" ");
    return words.length > 3 ? `${words.slice(0, 3).join(" ")}...` : text;
  };
  const handlePostData = async (): Promise<void> => {
    const url = 'http://127.0.0.1:5000/process_urls'; // Replace with your actual endpoint

    const data = { "urls": tests }; // Define the data variable

    try {
      // Make the POST request
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const result: ApiResponse = await response.json();
      console.log('Response from server:', result);

      // Handle success case
      if (result.success) {
        console.log('Data posted successfully!');
        clearAllTests();
      } else {
        console.log(`Server error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error posting data:', error);
      console.log('Failed to post data. Please try again.');
    }
  };
  return (
    <div className="flex flex-col items-center flex-1 p-6">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Chatbot Project</CardTitle>
          <CardDescription>Create your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="Url"
                  placeholder="place url of your project"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                />
                <Button type="button" onClick={addTest} className="mt-2">
                  Add Url
                </Button>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Frameworks For Embaddings</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="default" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Sellinium">Sellinium</SelectItem>
                    <SelectItem value="Unstructured">Unstructured </SelectItem>
                    <SelectItem value="Beautiful soup">Beautiful soup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
          <div className="mt-2"><Label>Added Urls</Label></div>
          <div className="mt-1 h-32 overflow-y-auto">
           
            {tests.length === 0 ? (
              <p className="text-gray-500">No url added yet.</p>
            ) : (
              <ul className="list-disc pl-4">
                {tests.map((test, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{truncateText(test)}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeTest(index)}
                      className="ml-2"
                    >
                      Cancel
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={clearAllTests}>
            Clear All
          </Button>
          <Button onClick={()=>{handlePostData();

          }}>Create Chatbot</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function page() {
  return (
    <main className="p-4 lg:p-8">
      <h1 className="text-2xl font-bold">Url Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Welcome to your dashboard. Here you can manage your urls here.
      </p>
      <div className="mt-8">
        <CardWithForm />
      </div>
      
    </main>
  );
}

export default page;