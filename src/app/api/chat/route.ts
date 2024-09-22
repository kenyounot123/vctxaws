import { NextRequest, NextResponse } from "next/server";
import { getAgent, invokeBedrockAgent } from "@/lib/aws-bedrock";
export async function POST(req:NextRequest) {
  // Get the latest message from request body
  const messageData = await req.json()
  const userMessage = messageData[messageData.length - 1]

  if (!messageData || messageData.length === 0) {
    return NextResponse.json("No message data provided", { status: 400 });
  }
  if (!userMessage || !userMessage.content) {
    return NextResponse.json("Invalid message format", { status: 400 });
  }


  const agent = await getAgent("ZMEW4H1GQ4")
  const agentAliasId = "P84SJGBGJS";
  if (agent) {
    const response = await invokeBedrockAgent(agentAliasId, agent.agentId as string, userMessage.content)
    console.log("Invoked agent response: ", response )
    return NextResponse.json(response?.completion)
  }
}