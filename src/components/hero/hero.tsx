import React from "react";
import Image from "next/image";
import hero from "@/assets/hero.png";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="w-full h-screen relative">
      <Image
        objectFit="cover"
        src={hero}
        alt="Hero"
        fill
        priority
        className="-z-10"
      />
      <header className="absolute bottom-1/4 left-[10%] flex flex-col gap-4">
        <h2 className="text-white uppercase text-2xl">tradycyjne notatki</h2>
        <h1 className="text-white uppercase text-7xl">Z miłości do papieru</h1>
        <Button className="self-start">sprawdź nasze kolekcje</Button>
      </header>
    </div>
  );
};
