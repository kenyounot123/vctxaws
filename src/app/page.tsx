"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Chatbot from "@/components/Chatbot";

export default function Content() {
  return (
    <main className="flex h-screen">
      <section className="border border-2 w-full">

      </section>
      <aside>
        <Chatbot/>
      </aside>
    </main>
  )
}
