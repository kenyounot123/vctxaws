import Chatbot from "@/components/Chatbot";
import { getAgent, invokeBedrockAgent } from "@/lib/aws-bedrock";

export default async function Content() {
  const agent = await getAgent("ZMEW4H1GQ4")
  const agentAliasId = "P84SJGBGJS";
  if (agent) {
    const response = await invokeBedrockAgent(agentAliasId, agent.agentId as string, "what is the value of 9+5?")

    console.log("Invoked agent response: ", response )
  }

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
