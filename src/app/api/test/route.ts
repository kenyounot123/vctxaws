import { NextRequest, NextResponse } from "next/server";
import { getAgent } from "@/lib/aws-bedrock";
export async function GET(req: Request) {
  const data = await getAgent('9PRR5CWP3C')
  console.log(data)
  return NextResponse.json(data)
}