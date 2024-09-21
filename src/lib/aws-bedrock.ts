import {
  BedrockAgentClient,
  GetAgentCommand,
} from "@aws-sdk/client-bedrock-agent";
import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";
import { v4 as uuidv4 } from 'uuid';
/**
 * Get details about an Amazon Bedrock foundation model.
 *
 * @return {FoundationModelDetails} - The list of available bedrock foundation models.
 */

export const getAgent = async (agentId:string, region = "us-east-1") => {
  const client = new BedrockAgentClient({ region });

  const command = new GetAgentCommand({ agentId });
  const response = await client.send(command);
  return response.agent;
};

export const invokeBedrockAgent = async (agentAliasId:string, 
  agentId:string, prompt:string) => {
  const client = new BedrockAgentRuntimeClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`, // permission to invoke agent
      secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
    },
  });

  const sessionId = uuidv4()


  const command = new InvokeAgentCommand({
    agentId,
    agentAliasId,
    sessionId,
    inputText: prompt,
  });

  try {
    let completion = "";
    const response = await client.send(command);

    if (response.completion === undefined) {
      throw new Error("Completion is undefined");
    }

    for await (let chunkEvent of response.completion) {
      const chunk = chunkEvent.chunk;
      const decodedResponse = new TextDecoder("utf-8").decode(chunk?.bytes);
      completion += decodedResponse;
    }

    return { sessionId: sessionId, completion };
  } catch (err) {
    console.error(err);
  }
};