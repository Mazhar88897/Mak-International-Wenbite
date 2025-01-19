import { ReactNode } from 'react';
import { Button} from '@/components/ui/button';
import Image from 'next/image';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <div className="flex items-center justify-between bg-black text-white p-4 shadow-lg">
      <span className="text-2xl font-bold">MAK INTERNATIONAL & CO</span>
      <div>
        {/* Add additional actions if necessary */}
      </div>
    </div>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
