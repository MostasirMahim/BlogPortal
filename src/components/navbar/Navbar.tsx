"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import palo from "../../../public/assets/palo.png";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  AlignJustify,
  Binary,
  House,
  Newspaper,
  Waypoints,
} from "lucide-react";
import ModeToggle from "./ModeToggle";

export const NavbarItems: React.FC<{
  path: string;
  name: string;
  Icon: React.ElementType;
}> = ({ path, name, Icon }) => {
  return (
    <Link
      href={path}
      className="md:text-lg lg:text-xl font-semibold hover:text-white hover:bg-gray-800 rounded-md p-1"
    >
      <div className="flex justify-start items-center gap-2  rounded-md p-2">
        <Icon className="w-5 h-5 lg:w-7 lg:h-7" />
        <p>{name}</p>
      </div>
    </Link>
  );
};

function Navbar() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const formattedDate = time.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const navbarData = [
    {
      name: "Home",
      path: "/",
      icon: House,
    },
    {
      name: "News",
      path: "/site/politics",
      icon: Newspaper,
    },
    {
      name: "Coding",
      path: "/site/technology",
      icon: Binary,
    },
    {
      name: "Jobs",
      path: "/site/business",
      icon: Waypoints,
    },
    {
      name: "Health",
      path: "/site/health",
      icon: Waypoints,
    },
    {
      name: "Entertainment",
      path: "/site/entertainment",
      icon: Waypoints,
    },
    {
      name: "Sports",
      path: "/site/sports",
      icon: Waypoints,
    },
  ];
  return (
    <div className="max-w-full">
      <header className="flex justify-between items-center py-4 px-6 gap-5 ">
        <Image src={palo} alt="logo" width={250} height={100} />
        {/* Mobile Menu */}
        <div className="flex md:hidden justify-end items-center gap-2">
        <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          
          <div>
            <ModeToggle />
          </div>
          <div>
            <Sheet>
              <SheetTrigger>
                <div className="flex items-center justify-center h-10 w-10 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                  <AlignJustify className="w-6 h-6" />
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <p className="text-2xl">Categories</p>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-start items-start gap-6 my-6">
                  {navbarData.map((item, index) => (
                    <NavbarItems
                      key={index}
                      path={item.path}
                      name={item.name}
                      Icon={item.icon}
                    />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>{" "}
          </div>
        </div>
        <div className="hidden md:flex flex-col items-center justify-center rounded-2xl  space-y-1">
          <div className="text-xl font-semibold">{formattedTime}</div>
          <div className="text-lg font-medium">{formattedDate}</div>
        </div>
      </header>

      {/* Desktop Menu */}
      <section className="hidden md:flex justify-center items-center  gap-5 px-10">
        <nav className="flex justify-center items-center space-x-6 space-y-2  flex-wrap ">
          {navbarData.map((item, index) => (
            <NavbarItems
              key={index}
              path={item.path}
              name={item.name}
              Icon={item.icon}
            />
          ))}
        </nav>

       

        <div className="flex justify-start items-center gap-2 ">
        <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <ModeToggle />
          </div>

          {/* Desktop Menu (//TODO : Changes)  */}
          <div className="">
            <Sheet>
              <SheetTrigger>
                <div className="flex items-center justify-center p-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                  <AlignJustify className="w-7 h-7" />
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <p className="text-2xl">Categories</p>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-start items-start gap-6 my-6">
                  {navbarData.map((item, index) => (
                    <NavbarItems
                      key={index}
                      path={item.path}
                      name={item.name}
                      Icon={item.icon}
                    />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Navbar;
