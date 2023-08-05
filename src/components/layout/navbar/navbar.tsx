import React from "react";
import { BiUser } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div className="flex w-full p-4 bg-gray-100 items-center justify-between">
      <span>Logo</span>

      <input
        type="text"
        placeholder="Search..."
        className="px-3 py-1 rounded-xl w-80"
      />
      <div className="flex gap-1">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BiUser className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuLabel>
                {`Hello ${session.user.name}!`}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              {/* <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link className="block" href="/signin">
            <BiUser className="w-5 h-5" />
          </Link>
        )}
        <button className="bg-gray-300 p-2 rounded-full">
          <AiFillHeart className="w-5 h-5" />
        </button>
        <button className="bg-gray-300 p-2 rounded-full">
          <AiOutlineShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
