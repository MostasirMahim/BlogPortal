import React from "react";
import NavbarPage from "./NavbarPage";
import { currentUser } from "@clerk/nextjs/server";
import { regUserToDB } from "@/actions/user.action";


async function Navbar() {
 try {
  const user = await currentUser();
  if (user) {
   try {
     await regUserToDB();
   } catch (err) {
     console.error("regUserToDB failed:", err);
   }
 }
  return <NavbarPage/>;
 } catch (error) {
  console.error(JSON.stringify(error));
 }
}

export default Navbar;
