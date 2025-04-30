"use client"
import { databaseUser, NavbarItems } from "./NavbarPage"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import {
    AlignJustify,
    Bell,
    House,
    LogOut,
    Newspaper,
    PencilLine,
    ShieldUser,
    SquareStack,
    User2Icon,
    UserPen,
  } from "lucide-react";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/nextjs";

function SheetComponent({ User : USER, setOpen, open } : { User : databaseUser, setOpen : React.Dispatch<React.SetStateAction<boolean>>, open : boolean} ) {
    const {signOut} = useClerk();
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
  return (
    <div>
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                  <div className="flex items-center justify-center h-10 w-10 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                    <AlignJustify className="w-6 h-6" />
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      <p className="text-2xl">The Daily Gen-G</p>
                    </SheetTitle>
                  </SheetHeader>
                  <nav
                    onClick={() => setOpen(false)}
                    className="flex flex-col justify-start items-start gap-2 mt-6 mb-2"
                  >
                    <div className="flex flex-col justify-center items-center mx-auto">
                      <img
                        src={USER?.avatar || "user.png"}
                        alt=""
                        className="w-20 h-20 rounded-full object-contain my-2 "
                      />
                      <div className="flex flex-col justify-center items-center">
                        <p className=" text-2xl ">{USER?.name || "User"}</p>
                        <p className=" text-lg italic ">
                          @{USER?.username || "Username"}
                        </p>
                      </div>
                    </div>

                    <NavbarItems
                      path={`/profile/${USER?.username}`}
                      name="Profile"
                      Icon={User2Icon}
                    />
                    <NavbarItems
                      path={`/profile/update/${USER?.username}`}
                      name="Update Profile"
                      Icon={UserPen}
                    />
                    <NavbarItems
                      path={`/notifications`}
                      name="Notifications"
                      Icon={Bell}
                    />
                    <NavbarItems
                      path="/create-article"
                      name="Create Article"
                      Icon={PencilLine}
                    />
                    <NavbarItems
                      path="/admin"
                      name="Admin Panel"
                      Icon={ShieldUser}
                    />
                  </nav>
                  <nav
                    onClick={() => setOpen(false)}
                    className=" md:hidden flex flex-col justify-start items-start gap-2 mt-2 mb-6"
                  >
                    {navbarData.map((item, index) => (
                      <NavbarItems
                        key={index}
                        path={item.path}
                        name={item.name}
                        Icon={item.icon}
                      />
                    ))}
                  </nav>
                  <Button
                    variant="destructive"
                    className="mx-auto w-full"
                    size={"lg"}
                    onClick={() => {
                      signOut(), setOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </SheetContent>
              </Sheet>{" "}
            </div>
  )
}

export default SheetComponent;