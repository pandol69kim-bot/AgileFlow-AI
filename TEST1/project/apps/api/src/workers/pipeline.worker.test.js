import { describe, expect, it, vi } from 'vitest';
import { consumePipelineStream } from './pipeline.worker.js';

async function* makeStream(chunks) {
  for (const chunk of chunks) {
    yield Buffer.from(chunk, 'utf8');
  }
}

describe('consumePipelineStream', () => {
  it('continues reading after failed event so solution event is captured', async () => {
    const onEvent = vi.fn();
    const onArtifact = vi.fn();
    const onStep = vi.fn();
    const onMalformedLine = vi.fn();

    const result = await consumePipelineStream(
      makeStream([
        '{"agent":"05_frontend_dev","status":"completed","step":4,"filename":"frontend_pages.md","content":"ok"}\n',
        '{"agent":"pipeline","status":"failed","error":"step 4 failed"}\n',
        '{"agent":"pipeline","status":"solution","content":"try fixing env"}\n',
      ]),
      { onEvent, onArtifact, onStep, onMalformedLine },
    );

    expect(onEvent).toHaveBeenCalledTimes(3);
    expect(onArtifact).toHaveBeenCalledTimes(1);
    expect(onStep).toHaveBeenCalledWith(4);
    expect(onMalformedLine).not.toHaveBeenCalled();
    expect(result.artifactCount).toBe(1);
    expect(result.failureError).toBe('step 4 failed');
    expect(result.sawSolution).toBe(true);
  });

  it('captures malformed lines and partial chunks without aborting stream parsing', async () => {
    const onEvent = vi.fn();
    const onArtifact = vi.fn();
    const onStep = vi.fn();
    const onMalformedLine = vi.fn();

    const result = await consumePipelineStream(
      makeStream([
        'not-json\n{"agent":"pipeline","status":"failed","error":"boom"',
        '}\n{"agent":"pipeline","status":"solution","content":"patched"}\n',
      ]),
      { onEvent, onArtifact, onStep, onMalformedLine },
    );

    expect(onMalformedLine).toHaveBeenCalledWith('not-json');
    expect(onEvent).toHaveBeenCalledTimes(2);
    expect(onArtifact).not.toHaveBeenCalled();
    expect(result.failureError).toBe('boom');
    expect(result.sawSolution).toBe(true);
    expect(result.artifactCount).toBe(0);
  });
});