export default {
    async fetch(request, env, ctx): Promise<Response> {
        return fetch(`https://experiencia21.tec.mx/api/v1/users/self`, {
            headers: {
                Authorization: `Bearer ${env.CANVAS_API_KEY}`
            }
        });
    }
} satisfies ExportedHandler<Env>;