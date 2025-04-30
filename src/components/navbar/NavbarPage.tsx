"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { House, Newspaper, SquareStack, UserPen } from "lucide-react";
import ModeToggle from "./ModeToggle";
import { SignInButton, useClerk } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getUserFromDB } from "@/actions/user.action";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Prisma } from "@prisma/client";
import SheetComponent from "./Sheet";

export interface databaseUser {
  id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  cover: string | null;
  website: string | null;
  location: string | null;
  social: Prisma.JsonValue | null;
  createdAt: Date;
  updatedAt: Date;
}

export const NavbarItems: React.FC<{
  path: string;
  name: string;
  Icon: React.ElementType;
}> = ({ path, name, Icon }) => {
  return (
    <Link
      href={path}
      className="text-sm  md:text-md  font-semibold hover:text-white hover:bg-gray-800 rounded-md p-1"
    >
      <div className="flex justify-start items-center gap-2  rounded-md p-2">
        <Icon className="w-5 h-5 " />
        <p>{name}</p>
      </div>
    </Link>
  );
};

function NavbarPage() {
  const [time, setTime] = useState<Date | null>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: USER, isLoading } = useQuery<databaseUser | null>({
    queryKey: ["authData"],
    queryFn: async () => await getUserFromDB(),
  });

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
    weekday: "short",
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
      name: "Category",
      path: "/category",
      icon: SquareStack,
    },
    {
      name: "Latest",
      path: "/site/latest",
      icon: Newspaper,
    },
    {
      name: "Authors",
      path: "/discover",
      icon: UserPen,
    },
  ];

  if (isLoading) return null;
  return (
    <div className="max-w-full bg-white dark:bg-black mx-[2px] border-b md:border-b-2 border-black dark:border-white">
      <header className="flex justify-between items-center px-6 gap-5 mt-2">
        <img
          onClick={() => router.push("/")}
          src="/assets/daily.png"
          alt=""
          className="w-32 h-20 md:w-40 md:h-24 p-2 object-contain"
        />
        {/* Mobile Menu */}
        <div className="flex md:hidden justify-end items-center gap-2">
          <div>
            {USER ? (
              <Avatar
                onClick={() => {
                  router.push(`/profile/${USER?.username}`);
                }}
              >
                <AvatarImage
                  src={USER?.avatar || "/user.png"}
                  className="cursor-pointer"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <SignInButton>
                <Button variant={"outline"} size={"sm"}>
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>

          <div>
            <ModeToggle />
          </div>
          {USER && <SheetComponent User={USER} setOpen={setOpen} open={open} />}
        </div>
        <div className="hidden md:flex flex-col justify-center items-center gap-2">
          <p className="text-sm">{formattedTime}</p>
          <p className="text-sm">{formattedDate}</p>
        </div>
      </header>

      {/* Desktop Menu */}
      <section className="hidden md:flex justify-between items-center  gap-5 px-10">
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
            {USER ? (
              <Avatar
                onClick={() => {
                  router.push(`/profile/${USER?.username}`);
                }}
              >
                <AvatarImage
                  src={USER?.avatar || "/user.png"}
                  className="cursor-pointer"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <SignInButton>
                <Button variant={"outline"} size={"lg"}>
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>
          <div>
            <ModeToggle />
          </div>

          {USER && <SheetComponent open={open} setOpen={setOpen} User={USER} />}
        </div>
      </section>
    </div>
  );
}

export default NavbarPage;
