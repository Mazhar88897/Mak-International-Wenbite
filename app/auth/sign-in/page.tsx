'use client'; // Ensure the component is a Client Component

import { useRouter } from 'next/navigation'; // Import from next/navigation
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignInCard() {
  const router = useRouter(); // Initialize useRouter for navigation

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement; // Cast e.target to HTMLFormElement
    const email = (form.elements.namedItem("email") as HTMLInputElement).value; // Access email input
    const password = (form.elements.namedItem("password") as HTMLInputElement).value; // Access password input

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Login successful!', data);
      // Save the token to localStorage
      localStorage.setItem('token', data.token);
      // Redirect to the /test page
      router.push('/test'); // Using client-side router.push
    } else {
      console.error('Login failed:', data.error);
    }
  };

  return (
    <div className="flex h-screen items-center bg-gradient-to-r from-black to-white justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In to Mak Internationals</CardTitle>
          <CardDescription>Access your account by signing in below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 mr-2">
              <Button type="submit">Sign In</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/auth/sign-in')}>Cancel</Button>
          <Button variant="outline" onClick={() => router.push('/auth/sign-up')}>Sign Up</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
