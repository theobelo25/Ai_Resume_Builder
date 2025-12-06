"use client";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Toaster } from "react-hot-toast";

const TopNav = () => {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="flex justify-between items-center py-1 px-2 top-nav">
      <Link href={"/"}>
        <Image src={logo} alt={"logo"} width={40} height={40} />
      </Link>

      <Toaster />

      <div className="flex justify-end items-center gap-4">
        {isSignedIn ? (
          <Button asChild>
            <Link href={"/dashboard"}>{user.fullName}&apos;s Dashboard</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
        )}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default TopNav;
