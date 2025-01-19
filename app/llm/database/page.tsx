'use client';
import { useState, ChangeEvent } from "react";
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

// Define the type for the database configuration
interface DbConfig {
  db_user: string;
  db_password: string;
  db_host: string;
  db_name: string;
}

export default function DatabaseConfigCard() {
  const [dbConfig, setDbConfig] = useState<DbConfig>({
    db_user: "",
    db_password: "",
    db_host: "",
    db_name: "",
  });

  // Event handler for input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDbConfig((prev) => ({ ...prev, [name]: value }));
  };

  // Event handler for form submission
  const handleSubmit = () => {
    // alert('Successfully Saved!')
    console.log("Database Configuration:", dbConfig);
    // Add logic to store or use the dbConfig object as needed
    setDbConfig({
        db_user: "",
        db_password: "",
        db_host: "",
        db_name: "",
      })
  };
  interface ApiResponse {
    success: boolean;
    message: string;
  }
  const handlePostData = async (): Promise<void> => {
    const url = 'http://127.0.0.1:5000/process_database'; // Replace with your actual endpoint

    // const data = {dbConfig}; // Define the data variable

    try {
      // Make the POST request
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dbConfig),
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
        handleSubmit();
      } else {
        console.log(`Server error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error posting data:', error);
      console.log('Failed to post data. Please try again.');
    }
  };


  return (
    <div className="p-8 mb-4">
         <h1 className="text-2xl font-bold">Database Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome to your dashboard. Here you can manage your databeases.
       </p>
    <div className="flex pt-4 flex-col items-center  min-h-screen ">
       
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Database Configuration</CardTitle>
        <CardDescription>
          Enter the details for your database connection.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="db_user">Database User</Label>
            <Input
              id="db_user"
              name="db_user"
              placeholder="Enter DB User"
              value={dbConfig.db_user}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="db_password">Database Password</Label>
            <Input
              id="db_password"
              name="db_password"
              type="password"
              placeholder="Enter DB Password"
              value={dbConfig.db_password}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="db_host">Database Host</Label>
            <Input
              id="db_host"
              name="db_host"
              placeholder="Enter DB Host"
              value={dbConfig.db_host}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="db_name">Database Name</Label>
            <Input
              id="db_name"
              name="db_name"
              placeholder="Enter DB Name"
              value={dbConfig.db_name}
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() =>
            setDbConfig({
              db_user: "",
              db_password: "",
              db_host: "",
              db_name: "",
            })
          }
        >
          Clear Credential
        </Button>
        <Button onClick={()=>{
                              handlePostData();
                              
        }}>Create Chatbot</Button>
      </CardFooter>
    </Card></div>
    </div>
  );
}

// function page() {
//     return (
//       <main className="p-4 lg:p-8">
//         
//         <div className="mt-8">
//          <DatabaseConfigCard />
//         </div>
//         <div className="fixed bottom-4 right-4">
//           <button
//             // onClick={() => router.push("/llm")}
//             className="px-6 py-3 bg-black text-white rounded-lg shadow"
//           >
//             Next
//           </button>
//         </div>
//       </main>
//     );
//   }
  
//   export default page;