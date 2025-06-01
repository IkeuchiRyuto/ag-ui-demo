from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from ag_ui.core import (
  RunAgentInput,
  Message,
  EventType,
  RunStartedEvent,
  RunFinishedEvent,
  TextMessageStartEvent,
  TextMessageContentEvent,
  TextMessageEndEvent
)
from ag_ui.encoder import EventEncoder
import uuid
from openai import OpenAI
import os
from fastapi import FastAPI
import uvicorn
from copilotkit.integrations.fastapi import add_fastapi_endpoint 
from copilotkit import CopilotKitRemoteEndpoint, LangGraphAgent 
from agent import agentic_chat_graph


app = FastAPI(title="AG-UI Endpoint")
sdk = CopilotKitRemoteEndpoint(
    agents=[
        LangGraphAgent(
            name="sample_agent", # the name of your agent defined in langgraph.json
            description="Describe your agent here, will be used for multi-agent orchestration",
            graph=agentic_chat_graph, # the graph object from your langgraph import
        )
    ],
)

add_fastapi_endpoint(app, sdk, "/copilotkit", use_thread_pool=False)

@app.post("/awp")
async def awp(input_data: RunAgentInput):
    async def event_generator():
        encoder = EventEncoder()

        yield encoder.encode(
            RunStartedEvent(
                type=EventType.RUN_STARTED,
                thread_id=input_data.thread_id,
                run_id=input_data.run_id,
            )
        )

        client = OpenAI()

        message_id = uuid.uuid4()

        yield encoder.encode(
            TextMessageStartEvent(
                tpye=EventType.TEXT_MESSAGE_START,
                message_id=str(message_id),
                role="assistant"
            )
        )

        stream = client.chat.completions.create(
            model="gpt-4o",
            messages=openai_messages,
            stream=True,
        )

        for chunk in stream:
            if hasattr(chunk.choices[0].delta, "content") and chunk.choices[0].delta.content:
                content = chunk.choices[0].delta.content
                yield encoder.encode(
                    TextMessageContentEvent(
                        type=EventType.TEXT_MESSAGE_CONTENT,
                        message_id=message_id,
                        delta=content
                    )
                )
        
        yield encoder.encode(
            TextMessageEndEvent(
                type=EventType.TEXT_MESSAGE_END,
                message_id=message_id,
            )
        )

        yield encoder.encode(
            RunFinishedEvent(
                type=EventType.RUN_FINISHED,
                thread_id=input_data.thread_id,
                run_id=input_data.run_id,
            )
        )

    return StreamingResponse(event_generator(), media_type="text/event-stream")