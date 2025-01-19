import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // Ensure dbConnect is properly defined.
import Record from "../../models/Record"; // Adjust the path to your model if necessary.

// CREATE a new record
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { containerNumber, formENumbers, company, date, status, fileUrl } = await req.json();
    console.log("Incoming data:", { containerNumber, formENumbers, company, date, status, fileUrl });

    if (!containerNumber || !formENumbers || !fileUrl) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
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

    return NextResponse.json(
      { success: true, message: "Record created successfully", data: newRecord },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating record:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create record", details: error.message },
      { status: 500 }
    );
  }
}

// READ all records or a single record by ID
export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const record = await Record.findById(id);
      if (!record) return NextResponse.json({ error: "Record not found" }, { status: 404 });
      return NextResponse.json(record, { status: 200 });
    } else {
      const records = await Record.find();
      return NextResponse.json(records, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to retrieve records", details: error.message }, { status: 500 });
  }
}

// UPDATE a record by ID with file URL
export async function PUT(req: NextRequest) {
  await dbConnect();

  try {
    const { _id, containerNumber, formENumbers, company, date, status, fileUrl } = await req.json();

    if (!_id) return NextResponse.json({ error: "Record ID is required" }, { status: 400 });

    const updatedRecord = await Record.findByIdAndUpdate(
      _id,
      { containerNumber, formENumbers, company, date, status, fileUrl },
      { new: true }
    );

    if (!updatedRecord) return NextResponse.json({ error: "Record not found" }, { status: 404 });

    return NextResponse.json(
      { message: "Record updated successfully", data: updatedRecord },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update record", details: error.message }, { status: 500 });
  }
}

// DELETE a record by ID
export async function DELETE(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const _id = searchParams.get("_id");

  if (!_id) return NextResponse.json({ error: "Record ID is required" }, { status: 400 });

  try {
    const deletedRecord = await Record.findByIdAndDelete(_id);
    if (!deletedRecord) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Record deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete record", details: error.message }, { status: 500 });
  }
}
