import OpenAI from "openai";
import { assignmentBreakdown } from "../functions";

class AssignmentBreakdownCompletion {
    openai: OpenAI;
    outStream: WritableStreamDefaultWriter<Uint8Array>;

    constructor(oai: OpenAI, ostream: WritableStreamDefaultWriter<Uint8Array>) {
        this.openai = oai;
        this.outStream = ostream;
    }

    async execute() {

        const stream = await this.openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: assignmentBreakdown.prompt },
                { role: 'user', content: assignmentBreakdown.samples[0] }
            ],
            stream: true,
            response_format: assignmentBreakdown.schema
        });

        const encoder = new TextEncoder();

        for await (const part of stream) {
            this.outStream.write(encoder.encode(part.choices[0]?.delta?.content || ''));
        }
    }
}

export default {
    async fetch(request, env, ctx): Promise<Response> {
        const openai = new OpenAI({
            apiKey: env.OPENAI_API_KEY,
        });

        let { readable, writable } = new TransformStream();
        let writer = writable.getWriter();

        let completion = new AssignmentBreakdownCompletion(openai, writer);

        ctx.waitUntil(completion.execute().then(() => writer.close()));

		return new Response(readable);
    }
} satisfies ExportedHandler<Env>;