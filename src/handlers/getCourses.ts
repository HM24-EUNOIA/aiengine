const url = `https://experiencia21.tec.mx/api/v1/courses`;

interface CanvasCourse {
  id: string;
  name: string;
  course_code: string;
}

interface CourseInfo {
  id: string;
  name: string;
  course_code: string;
}

export default {
    async fetch(request, env, ctx): Promise<Response> {
      const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${env.CANVAS_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
      const courses: CanvasCourse[] = await response.json();
      const course_ids: CourseInfo[] = courses
        .filter(course => course.name && course.name.trim() !== '')
        .map(course => ({
          id: course.id,
          name: course.name,
          course_code: course.course_code
        }));
      return new Response(JSON.stringify(course_ids), {
        headers: { 'Content-Type': 'application/json' }
      });      
    }
} satisfies ExportedHandler<Env>; 