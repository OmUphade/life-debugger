import { GoogleGenerativeAI } from "@google/generative-ai";

import { runBehaviorQuery } from "@/lib/coral";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function isRelevantQuestion(question: string) {
  const keywords = [
    "burnout",
    "productivity",
    "focus",
    "work",
    "deadline",
    "stress",
    "meeting",
    "task",
    "github",
    "discord",
    "calendar",
    "notion",
    "email",
    "fatigue",
    "deep work",
  ];

  return keywords.some((keyword) => question.toLowerCase().includes(keyword));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { question } = body;

    if (!isRelevantQuestion(question)) {
      return Response.json({
        success: true,

        data: {
          rootCause:
            "No behavioral investigation pattern detected in the submitted query.",

          observations: [
            "Life Debugger specializes in productivity and behavioral analysis.",
            "The submitted prompt does not correlate with connected behavioral systems.",
            "Try asking about burnout, focus, productivity, deadlines, or work patterns.",
          ],

          recommendations: [
            "Ask questions related to productivity or behavioral signals.",
            "Reference work habits, focus patterns, or communication overload.",
            "Use investigation prompts tied to digital activity patterns.",
          ],
        },

        liveData: null,
      });
    }

    const liveData = runBehaviorQuery() as {
      late_commits: number;
      focus_score: number;
      interruptions: number;
      meeting_hours: number;
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
    });

    const prompt = `
You are Life Debugger, an AI behavioral investigation system.

The user asked:
"${question}"

Analyze using these REAL behavioral findings:

- Meeting hours: ${liveData.meeting_hours}
- Discord interruptions: ${liveData.interruptions}
- Late-night commits: ${liveData.late_commits}
- Focus score: ${liveData.focus_score}

Reference cross-source behavioral evidence naturally.

Return ONLY valid JSON in this exact structure:

{
  "rootCause": "short paragraph",
  "observations": [
    "observation 1",
    "observation 2",
    "observation 3"
  ],
  "recommendations": [
    "recommendation 1",
    "recommendation 2",
    "recommendation 3"
  ]
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return Response.json({
      success: true,
      data: parsed,
      liveData,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
    });
  }
}
