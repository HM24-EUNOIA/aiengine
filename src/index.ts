import processAssignments from "./handlers/processAssignments";
import canvasImport from "./handlers/canvasImport";

export default {
	async fetch(request, env, ctx): Promise<Response> {
        const url = new URL(request.url);

        switch (url.pathname) {
            case '/api/process-assignments':
                return processAssignments.fetch(request, env, ctx);

            case '/api/canvas-import':
                return canvasImport.fetch(request, env, ctx);
        }

        return new Response("bruh", {
            status: 404
        });
	},
} satisfies ExportedHandler<Env>;
