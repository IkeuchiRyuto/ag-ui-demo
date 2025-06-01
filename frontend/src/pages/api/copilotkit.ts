import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSPagesRouterEndpoint,
  OpenAIAdapter
} from "@copilotkit/runtime";
import { NextApiRequest, NextApiResponse } from "next";


const serviceAdapter = new ExperimentalEmptyAdapter();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const runtime = new CopilotRuntime({
    remoteEndpoints: [{ url: "http://localhost:8000/copilotkit" }],
  });

  const handleRequest = copilotRuntimeNextJSPagesRouterEndpoint({
    endpoint: "/api/copilotkit",
    runtime,
    serviceAdapter,
  });

  return await handleRequest(req, res);
};

export default handler;
