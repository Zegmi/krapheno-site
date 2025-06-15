import type { NextApiRequest, NextApiResponse } from 'next';
import { AgentOrchestrationService } from '@/services/agentOrchestrationService';
import { N8NToAutoGenPayload } from '@/types/payloads';
import { AutoGenToN8NResponse } from '@/types/responses';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AutoGenToN8NResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const payload: N8NToAutoGenPayload = req.body;

    const agentResponse = await AgentOrchestrationService.sendToAutoGen(payload);

    return res.status(200).json({
      success: true,
      message: "Agent triggered successfully",
      agentResponse,
    });
  } catch (error: any) {
    console.error("Agent trigger failed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
