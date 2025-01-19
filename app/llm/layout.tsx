import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Switch } from "@/components/ui/switch"

const notifications = [
  {
    title: "We are working on your chatbot :)",
    description: "1 hour ago",
  },
  
]

type CardProps = React.ComponentProps<typeof Card>

export function CardDemo({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[230px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Instructions</CardTitle>
        {/* <p>instructions:</p> */}
      </CardHeader>
      <CardContent className="grid gap-1">
        <div className="text-sm flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Choose Model Carefully
            </p>
            
          </div>
          
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  )
}

import React from "react";
import Link from "next/link";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";

type IconProps = React.SVGProps<SVGSVGElement>;

const ActivityIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
  </svg>
);

const GlobeIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const HomeIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const LayoutGridIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);

const MenuIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const MountainIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </svg>
);

const UsersIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const DatabaseIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* The outer ellipse representing the top of the database */}
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    {/* The vertical line representing the cylindrical shape */}
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    {/* The bottom ellipse representing the base of the database */}
    <path d="M3 19c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const Component = ({children}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex fixed  h-screen w-full">
      <div className="hidden    lg:block lg:w-64 lg:shrink-0 lg:border-r lg:bg-gray-100 dark:lg:bg-gray-800">
        <div className="flex h-full flex-col justify-between py-6 px-4">
          <div className="space-y-6 m-1">
            <Link href="#" className="flex items-center gap-2 font-bold" prefetch={false}>
              <MountainIcon className="h-6 w-6" />
              <span className="text-lg">SmartDoc Assistant</span>
            </Link>
            <nav className="space-y-1">
              <Link
                href="/llm"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                prefetch={false}
              >
                <HomeIcon className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="/llm/pdf"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                prefetch={false}
              >
                <LayoutGridIcon className="h-5 w-5" />
                Documents
              </Link>
              <Link
                href="/llm/text"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                prefetch={false}
              >
                <UsersIcon className="h-5 w-5" />
                Metadata
              </Link>
              <Link
                href="/llm/url"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                prefetch={false}
              >
                <ActivityIcon className="h-5 w-5" />
                Urls
              </Link>
              <Link
                href="/llm/database"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                prefetch={false}
              >
                <DatabaseIcon className="h-5 w-5" />
                Databases
              </Link>
            </nav>
          </div>
          <div>
            <CardDemo />
          </div>
          <div className="space-y-4">
           
            
            <div>
              <SidebarBottom />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <GlobeIcon className="h-5 w-5" />
              <span>English</span>
            </div>
          </div>
        </div>
        
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Component;


import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image"

export function SidebarBottom() {
  return (
  
     
      <div className="p-2">
        <button className="flex items-center space-x-2 w-full">
              <Image
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAADx8fEJCQn39/fw8PD8/PzZ2dn09PTi4uKWlpZwcHDQ0NB9fX1jY2Ps7OxJSUm3t7cqKiqlpaVoaGiFhYW/v79DQ0MXFxd5eXktLS1dXV0lJSXIyMigoKA4ODgdHR1VVVWPj4+tra1PT0+Tk5Na8LRmAAAEkElEQVR4nO3d63aqMBAFYCPIpaiI1vut2vb9X/GUti57LJjLkExi9/e/a2UvQJLJkPZ6AAAAAAAAAAAAAAAAAAAAAAAAAH9VEmf9LE64h2FHklaj8XK6ilbT5XhUpY8Wc1HsxP92xYJ7UN0pz6LZueQeWifKdUu+2voBMj7dyVd74h4gUbqRBBRik3IPkmImzVc7cA/TWFIoBRSiCPTVkbwpBhTiLciI8VE5oBDHmHu4+uKJRkAhluFF3GoFFGLLPWBdI82AQsy5h6yn0g4oRMU9aB25QUAhQprB6T6EXwJ6FE3u0Vow92liGFCIUF78suVEu0AWGrFxQCHCeO8fCAmDWGYkU0LCaQhP4oIQUIgQylPPpIQF9/DlMlJAITLuAFK0mzSE21R/UfG/EXcAKWJAEXEHkBlQE4oBdwQJ6mPo/4OoViG9Z8YdQYL2Nqz5/kZckhMuuSNIUCalX6bcESReyAlfuCPcF0fkhCu/14h9esLI75lpFwn73CHuyjpI6Pdd+vi/NL3bphJ9O+4IEjqbhs2O3BEkxuSEY+4IEubV4Avfq8KmWxZXvm9emO2r/ZRzR5AhJ+QOIEVdID5zB5B6JSZ85Q4gVRITBrDVfSIFPHEPXwHtNvX/Ju31BpTlReR7tfQTpa4fRtsQ5aUfwO9MTbWt9Dffa6UX5i+MQC6h+QLD92XFVSLvX29yDKFN4dveKOGQe9g62r6SuefMPWg96l3sF2/cQ9aU6Rbddn6Xuhvovve9X9r/phcxwIB6EYMM+DG3Ud0unQYzl7mVqNWHx57vxdyl0prhe/OFRC5r298G+gj+sL/3Zlz53h+kZtH2kdfyMfLV0vnvXbfjPOjPY39J8tn62k20XM/ygJZK6pI4T4dp/qjHRgCAU3m1MKjOl2Uo89P8syKsWxncf0wLNk8hLPSHl4noRqd0Vn6vQla+Z0wWPyulJ9VJy2D+46/WHk91ssPtkvdZZbT5/OavTnvrQzUyOK8aJteTSjKB2Tetko8ebpT2by/EVdF+SYbztu3UlWfr4oGkxr2dpf2ba9lPZ5LGlJk/L49Yaa9pWYwO1X6YDvfVYVSonAuye/Vkiv5K75pts/GhyW1oL1/tyP3uKM13tFWtWdszqC1eSiK+W7U8uQj4Ycv0gQK9WVYdR1EuoX7wq8d9K9FA76ArujfHd2pK/zZGV+S0/D90nq/msFfDrJmEztmqiucK1hxdRfoHB+acPIvafSRd2rlYUdG/R6dw8LGCy5lME+uTVOrxM3S2y43t5RhXLM/f+C+h7YtI/7yQzu6JZ2bNv93a2AyYcqf7ZLN0Qz99pgs2i8X2604qbH6Vod/bbIPFfumYfvpMF6b2JqdZ0+6Seyt7b8QOTi7pgsXTT5DQESREQiTkZzFhZnc3VJXNT6Rcb1Y0m9gL+Adm3tyFti82y22k8xK6YvfcBf5Sm+1iG+W/AnTFcmGffk4wlfUt/XfmgO+2A3JHdBCQ90Z11HUSt3aF2hXN3fVjDqpisotc2k2KynWDW9Z3yfMWfgAAAAAAAAAAAAAAAAAAAAAAAABF/wCB50Scz71fkQAAAABJRU5ErkJggg=="
                alt="User Avatar"
                width={10}
                height={10}
                className="w-10 h-10 rounded-full"
              />
              <div className="text-left">
                <p className="text-sm font-medium">Bella Dimitrus</p>
                <p className="text-xs text-gray-400">m@example.com</p>
              </div>
            </button>
      </div>
   
  );
}
