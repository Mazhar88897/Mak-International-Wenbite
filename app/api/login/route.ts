import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "../../models/User";

const SECRET_KEY = process.env.SECRET_KEY || "mak-internationals"; // Replace with a secure key

export async function POST(req: { json: () => Promise<{ email: string; password: string }> }) {
  await dbConnect(); // Connect to MongoDB
  
  const { email, password } = await req.json();

  // Validate input
  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Email and password are required" }),
      { status: 400 }
    );
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 } // Unauthorized
      );
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 } // Unauthorized
      );
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" } // Token expiration time
    );

    return new Response(
      JSON.stringify({ message: "Login successful", token }),
      { status: 200 } // Success
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: "Something went wrong", details: errorMessage }),
      { status: 500 } // Internal Server Error
    );
  }
}
