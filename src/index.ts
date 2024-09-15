import processAssignments from "./handlers/processAssignments";
import canvasImport from "./handlers/canvasImport";

interface Assignment {
    id: string | number;
    name: string;
    course_id: string;
    due_at: string;
    submission_types: string[];
    has_submitted_submissions: string;
    description: string
}


function stripHtml(html: string): string {
    let text = html.replace(/<[^>]*>?/gm, '');
    
    text = text.replace(/&nbsp;/g, ' ')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&amp;/g, '&');
    
    let lines = text.split('\n').map(line => line.trim());
    
    lines = lines.filter(line => line.length > 0);
    
    text = lines.join('\n\n');
    
    text = text.replace(/\s+/g, ' ');
    
    return text;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return dateString;
    }
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    };
  
    return date.toLocaleString('en-US', options) + ' UTC';
}

function transformData(data: unknown): Assignment[] {
    if (!Array.isArray(data)) {
      throw new Error('Expected data to be an array');
    }
    
    return data

      .filter(item => {
      return typeof item === 'object' && item !== null && item.due_at != null && item.has_submitted_submissions != "";
      })

      .map(item => {
      if (typeof item !== 'object' || item === null) {
        throw new Error('Expected item to be an object');
      }
      
      return {
        id: item.id ?? '',
        name: String(item.name ?? ''),
        due_at: String(item.due_at ?? ''),
        course_id: String(item.course_id ?? ''),
        submission_types: Array.isArray(item.submission_types) ? item.submission_types : [],
        description: stripHtml(String(item.description ?? '')),
        has_submitted_submissions: String(item.has_submitted_submissions ?? '')
      };
    });
}
  

export default {
	async fetch(request, env, ctx): Promise<Response> {
        const url = new URL(request.url);
        console.log(url.pathname);

        switch (url.pathname) {
            case '/api/process-assignments':
                return processAssignments.fetch(request, env, ctx);

            case '/api/canvas-import':
                console.log("hi")
                const response = await canvasImport.fetch(request, env, ctx);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
            
                const data: unknown = await response.json();
                const transformedData = transformData(data);
                return new Response(JSON.stringify(transformedData), {
                    headers: { 'Content-Type': 'application/json' }
                });
                
        return new Response("bruh", {
            status: 404
        });
        }
    }
} satisfies ExportedHandler<Env>;
