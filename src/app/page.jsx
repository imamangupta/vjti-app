import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import mark from "@/assets/mark.svg";

const page = () => {
  return (
    <div>
      <header className="px-20 flex justify-between my-5">
        <h1 className="text-xl font-semibold">
          Blue<span className="text-blue-700">Circle</span>.
        </h1>
        <div></div>
        <div className="space-x-5">
          <Button variant={"outline"}>Login</Button>
          <Button>Get Started</Button>
        </div>
      </header>
      <section className="p-20 border flex justify-center flex-col items-center">
        <h1 className="text-5xl text-center leading-snug font-semibold">
          Run <span className="text-[#311FF5]">Organization</span>{" "}
          <div className="relative inline-block">
            Effortlessly{" "}
            <Image
              src={mark}
              alt="mark"
              height={150}
              width={150}
              className="absolute right-10 -bottom-3"
            />
          </div>{" "}
          <br />
          with Ai Powerd Features
        </h1>

        <p className="text-base w-[62ch] my-10 text-center">Lorem ratione nostrum Lorem ipsum dolor sit vitae eos ipsum dolor reprehenderit quasi Lorem ipsum dolor sit.lonik kanmq soluta dolorum, suscipit culpa vitae dolor.</p>
        <Button className="p-8 rounded-xl text-lg">Get Started</Button>
      </section>
      <section>
        
      </section>
    </div>
  );
};

export default page;
