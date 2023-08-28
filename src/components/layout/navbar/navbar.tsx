import { useQuery } from "@apollo/client";
import React from "react";
import { useSession } from "next-auth/react";
import { ME_QUERY } from "@/graphql/queries/me";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import logo from "@/assets/logo.svg";
import icon_user from "@/assets/icon_user.svg";
import icon_search from "@/assets/icon_search.svg";
import icon_cart from "@/assets/icon_cart.svg";
import icon_heart from "@/assets/icon_heart.svg";

import { useLocalStorage } from "@/utils/use-local-storage";

const MENU = [
  {
    name: "Personalne",
    href: "/personalne",
  },
  {
    name: "Rozwój kariery",
    href: "/rozwoj-kariery",
  },
  {
    name: "Do pracy",
    href: "/do-pracy",
  },
  {
    name: "O nas",
    href: "/o-nas",
  },
  {
    name: "Kontakt",
    href: "/kontakt",
  },
];

export const Navbar = () => {
  const { push } = useRouter();
  const [localStorageCartId] = useLocalStorage<string>("cartId");
  const { data: session } = useSession();
  const { data: me } = useQuery(ME_QUERY);

  const onRedirectToCart = async () => {
    const currentCartId = me?.me?.checkout?.id ?? localStorageCartId;

    if (currentCartId) {
      return push(`/cart/${currentCartId}`);
    }

    return push(`/cart/empty`);
  };

  return (
    <>
      <div className="absolute top-0 left-0 flex w-full pt-3 px-6 shadow-lg items-center justify-between z-10 border-b-2">
        <Link href="/">
          <Image src={logo} alt="Logo" />
        </Link>
        <nav>
          <ul className="flex gap-8">
            {MENU.map((item) => (
              <li
                key={item.href}
                className={
                  "pb-3 flex relative overflow-x-hidden before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:bg-white hover:before:translate-x-0 before:-translate-x-full before:transition-transform ease-in-out duration-300"
                }
              >
                <Link href={item.href} className="text-white uppercase">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-1">
          <Image src={icon_user} alt="Icon user" />
          <Image src={icon_search} alt="Icon search" />
          <Image src={icon_heart} alt="Icon heart" />
          <Image src={icon_cart} alt="Icon cart" onClick={onRedirectToCart} />
        </div>
      </div>
    </>
  );
};
