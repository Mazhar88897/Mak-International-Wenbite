"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
export function TextareaWithText() {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your Message</Label>
      <Textarea placeholder="Type your message here." id="message-2" />
      <p className="text-sm text-muted-foreground">
        Your message will be copied to the support team.
      </p>
    </div>
  );
}


import React, { useState } from "react";
// import { TextareaWithText } from "@/components/ui/TextareaWithText";

const  NewPage: React.FC = () => {
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  const handleAddParagraph = () => {
    const textarea = document.getElementById("message-2") as HTMLTextAreaElement;
    const text = textarea?.value.trim();
    if (text) {
      setParagraphs((prev) => [...prev, text]);
      textarea.value = ""; // Clear the textarea after adding
    }
  };

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };
  const router = useRouter();
  return (
    <div className="flex flex-col items-center  flex-1 p-6">
      <div className="w-3/4 max-w-lg p-6 bg-white shadow-md rounded-lg">
        {/* Textarea Input */}
        <TextareaWithText />

        {/* Add Button */}
        <button
          onClick={handleAddParagraph}
          className="mt-4 w-full px-4 py-2 bg-black text-white rounded-md shadow"
        >
          Create Chatbot
        </button>
        <h3 className="text-lg font-semibold  mt-6 text-gray-700">Added Paragraphs:</h3>

        {/* Display Truncated Paragraphs */}
        <div className="h-48 overflow-y-auto">
          
          {paragraphs ?  ( 
          <ul className="mt-2 space-y-2">
            {paragraphs.map((paragraph, index) => (
              <li
                key={index}
                className="p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
              >
                {truncateText(paragraph, 10)}
              </li>
            ))}
          </ul> ) : (<p>No Text Added Now</p>)}
        </div>
      </div>
      
    </div>
  );
};

function page() {
    return (
      <main className="p-4 lg:p-8">
        <h1 className="text-2xl font-bold"> Metadata Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome to your dashboard. Here you can manage your metadata.
        </p>
        <div className="mt-8">
            <NewPage />
        </div>
      </main>
    );
  }
  
  export default page;
