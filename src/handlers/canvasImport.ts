const courseId = '492384';
const url = `https://experiencia21.tec.mx/api/v1/courses/${courseId}/assignments`;

export default {
    async fetch(request, env, ctx): Promise<Response> {
        return fetch(url, {
            headers: {
                'Authorization': `Bearer ${env.CANVAS_API_KEY}`,
                'Content-Type': 'application/json'
              }
        });
        
    }
} satisfies ExportedHandler<Env>; 