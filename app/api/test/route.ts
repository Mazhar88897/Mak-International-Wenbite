import { Request } from 'express';
import dbConnect from "@/lib/mongodb"; // Ensure dbConnect is properly defined.
import Record from "../../models/Record";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { containerNumber, formENumbers, company, date, status, fileUrl } = await req.json();
    console.log("Incoming data:", { containerNumber, formENumbers, company, date, status, fileUrl });

    if (!containerNumber || !formENumbers || !fileUrl) {
      return new Response(
        JSON.stringify({ success: false, error: "All fields are required" }),
        { status: 400 }
      );
    }

    const newRecord = await Record.create({
      containerNumber,
      formENumbers,
      company,
      date,
      status,
      fileUrl, 
    });

    console.log("Record created successfully:", newRecord);

    return new Response(
      JSON.stringify({ success: true, message: "Record created successfully", data: newRecord }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating record:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to create record", details: error.message }),
      { status: 500 }
    );
  }
}


// READ all records or a single record by ID
export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const record = await Record.findById(id);
      if (!record) return new Response(JSON.stringify({ error: "Record not found" }), { status: 404 });
      return new Response(JSON.stringify(record), { status: 200 });
    } else {
      const records = await Record.find();
      return new Response(JSON.stringify(records), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to retrieve records", details: error.message }), { status: 500 });
  }
}

// UPDATE a record by ID with file URL
export async function PUT(req: Request) {
  await dbConnect();

  try {
    const { _id, containerNumber, formENumbers, company, date, status, fileUrl } = await req.json();

    if (!_id) return new Response(JSON.stringify({ error: "Record ID is required" }), { status: 400 });

    // Update the record with the new data, including file URL
    const updatedRecord = await Record.findByIdAndUpdate(
      _id,
      { containerNumber, formENumbers, company, date, status, fileUrl },
      { new: true }
    );

    if (!updatedRecord) return new Response(JSON.stringify({ error: "Record not found" }), { status: 404 });

    return new Response(JSON.stringify({ message: "Record updated successfully", data: updatedRecord }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update record", details: error.message }), { status: 500 });
  }
}

// DELETE a record by ID
export async function DELETE(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const _id = searchParams.get("_id"); // Fetch `_id` from query params

  if (!_id) return new Response(JSON.stringify({ error: "Record ID is required" }), { status: 400 });

  try {
    const deletedRecord = await Record.findByIdAndDelete(_id);
    if (!deletedRecord) {
      return new Response(JSON.stringify({ error: "Record not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Record deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete record", details: error.message }), { status: 500 });
  }
}
