import { useQuery } from "@apollo/client";
import React from "react";
import { BiUser } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";
import { ME_QUERY } from "@/graphql/queries/me";
import { useRouter } from "next/router";
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

import { useLocalStorage } from "@/utils/use-local-storage";

export const Navbar = () => {
  const { push } = useRouter();
  const [cartId, setCartId] = useLocalStorage<string>("cartId");
  const { data: session } = useSession();
  const { data: me } = useQuery(ME_QUERY);

  const onRedirectToCart = () => {
    const currentCartId = me?.me?.checkout?.id ?? cartId;

    if (currentCartId) {
      return push(`/cart/${currentCartId}`);
    }
  };

  return (
    <>
      <div className="flex w-full p-4 shadow-lg items-center justify-between">
        <Link href="/">Logo</Link>
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
          <button onClick={onRedirectToCart}>
            <AiOutlineShoppingCart className="w-5 h-5" />
          </button>
          <button>
            <AiFillHeart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};
