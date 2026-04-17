from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import json
import asyncio

from orchestrator import run_pipeline

app = FastAPI(title="AgileFlow Pipeline Server")


class RunRequest(BaseModel):
    project_id: str
    idea_input: str


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/run")
async def run(req: RunRequest):
    async def event_stream():
        async for event in run_pipeline(req.project_id, req.idea_input):
            yield json.dumps(event) + "\n"

    return StreamingResponse(event_stream(), media_type="application/x-ndjson")
