"use client";

import React from "react";

const RedirectBoxes = () => {
  const handleRedirect = (url: string) => {
    window.location.href = url; // Redirect to the specified URL
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl  font-bold">Database Dashboard</h1>
        <p className="text-gray-500 mb-4 dark:text-gray-400">
          Welcome to your dashboard. Here you can manage your databeases.
       </p>
    <div className=" flex flex-col h-full justify-center items-center space-y-4">
       
      <div
        onClick={() => handleRedirect("/llm/database")}
        className="h-44 w-3/5 border-dashed border-2 border-black rounded-xl shadow-xl flex justify-center items-center cursor-pointer hover:bg-gray-100 transition"
     
      >
       Database Dashboard
      </div>
      {/* Second Box */}
      <div
        onClick={() => handleRedirect("/llm/pdf")}
        className="h-44 w-3/5 border-dashed border-2 border-black rounded-xl shadow-xl flex justify-center items-center cursor-pointer hover:bg-gray-100 transition"
       
      >
        Document Dashboard
      </div>
      {/* Third Box */}
      <div
        onClick={() => handleRedirect("llm/url")}
        className="h-44 w-3/5 border-dashed border-2 border-black rounded-xl shadow-xl flex justify-center items-center cursor-pointer hover:bg-gray-100 transition"
      
      >
        Url Dashboard
      </div>
    </div>
    </div>
  );
};

export default RedirectBoxes;
