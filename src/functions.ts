import OpenAI from "openai"

interface AIFunction {
    prompt: string,
    schema: OpenAI.ResponseFormatJSONSchema,
    samples: string[]
}

export const assignmentBreakdown: AIFunction = {
    prompt: `You are a study assistant that will help students break down their assignments into easy to mentalize subtasks. You will be given an assignment title and a description along with the subject the assignment belongs to.
You may include subtasks that involve investigation or setup for the assignment.
You must adhere to the following restriction as you divide the assignment into subtasks:  **No subtask must, under reasonable conditions, take less than 10 minutes to complete**.`,
    schema: {
        "type": "json_schema",
        "json_schema": {
          "name": "subtasks",
          "strict": true,
          "schema": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "A unique identifier for the task."
              },
              "subtasks": {
                "type": "array",
                "description": "A list of subtasks associated with the main task.",
                "items": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string",
                      "description": "The title of the subtask."
                    },
                    "description": {
                      "type": "string",
                      "description": "A detailed description of the subtask."
                    }
                  },
                  "required": [
                    "title",
                    "description"
                  ],
                  "additionalProperties": false
                }
              }
            },
            "required": [
              "id",
              "subtasks"
            ],
            "additionalProperties": false
          }
        }
      },
    samples: [
        `id: \`8eba2712c\`
Title: Getting Started with LaTeX (Ken)
Description:
Your final goal for this exercise is to write a short (approximate 3 page) article/essay on the importance of being a professional in your practice.
The section in the contents for this course specify (in Spanish below) and visible at Contenidos de aprendizaje
5.3 El profesional de la ingeniería de software. 5.3.1 Comunidades de práctica. 5.3.2 Recursos en línea para la calidad del software. 5.3.3 Entrenamientos y certificaciones para la calidad del software.
Create a document using LaTeX and submit both the LaTeX source file (and any extra files necessary to compile to pdf) *and* the pdf result from exporting on this topic.
You must include at least the use of the following LaTeX features: lists, embedded image, table, and a table of contents.

Possible resources to get you started:
https://latex-tutorial.com/tutorials/
https://youtu.be/4NHqeNJbXVw?si=oW4tC9C7XHd6f-LC
https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes
https://www.colorado.edu/aps/sites/default/files/attached-files/latex_primer.pdf
https://www.tug.org/texworks/
https://en.wikipedia.org/wiki/TeX_Live
https://en.wikipedia.org/wiki/MiKTeX
https://en.wikipedia.org/wiki/MacTeX`
    ]
}
