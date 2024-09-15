export default {
    async fetch(request, env, ctx): Promise<Response> {
        return new Response("bolas");
    }
} satisfies ExportedHandler<Env>;