import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "../../models/User";

export async function POST(req: { json: () => PromiseLike<{ name: any; email: any; password: any; }> | { name: any; email: any; password: any; }; }) {
  await dbConnect(); // Connect to MongoDB
  const { name, email, password } = await req.json();

  // Validate input
  if (!name || !email || !password) {
    return new Response(
      JSON.stringify({ error: "All fields are required" }),
      { status: 400 }
    );
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email is already registered" }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return new Response(
      JSON.stringify({ message: "User created successfully", user }),
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: "Something went wrong", details: errorMessage }),
      { status: 500 }
    );
  }
}
