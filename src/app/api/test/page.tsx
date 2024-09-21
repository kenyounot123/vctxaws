'use client'
import { client, main } from "@/lib/aws-bedrock";
import { useEffect } from "react";
export default function Test() {
  useEffect(() => {
    async function bedRockTest() {
      const data = await main()
      console.log(data)
    }
    
    bedRockTest()
  }, [])
}