import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Write a script to generate 30 seconds video on topic: Interesting story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContextText as field"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"video_scenes\": [\n    {\n      \"scene_number\": 1,\n      \"duration\": 3,\n      \"imagePrompt\": \"A weathered, antique wooden chest half-buried in the golden sand of a secluded beach at sunset. The chest is slightly open, with a faint, ethereal glow emanating from within. Realistic, cinematic lighting, shallow depth of field, focus on the chest.\",\n      \"contextText\": \"The story begins with the discovery of a mysterious chest on a deserted beach.\"\n    },\n    {\n      \"scene_number\": 2,\n      \"duration\": 4,\n      \"imagePrompt\": \"Close-up of a hand, aged and with visible scars, carefully opening the chest. The hand is wearing a simple, worn leather bracelet.  Inside the chest, fragments of old maps and tattered letters are visible, dimly lit by the golden glow. Realistic, highly detailed, macro lens.\",\n       \"contextText\": \"An old mariner, drawn by curiosity, cautiously examines its contents.\"\n\n    },\n      {\n        \"scene_number\": 3,\n        \"duration\": 5,\n        \"imagePrompt\": \"A wide shot of an old, leather-bound journal lying open on a wooden table. The journal's pages are filled with handwritten script, faded ink, and intricate sketches of fantastical creatures and landscapes. A single candle flickers nearby, casting long shadows.  Realistic, slightly moody lighting, focus on the journal.\",\n        \"contextText\": \"Inside, he finds a journal filled with extraordinary tales and forgotten legends.\"\n    },\n    {\n      \"scene_number\": 4,\n      \"duration\": 5,\n        \"imagePrompt\": \"A vivid, realistic depiction of a bustling, hidden city built into the side of a giant, ancient tree in a tropical jungle. The city is filled with unique architecture, bridges, and people going about their lives, all illuminated by the soft, dappled sunlight filtering through the leaves. Realistic, vibrant colors, aerial perspective.\",\n      \"contextText\": \"One entry describes a hidden city nestled within a colossal tree in a forgotten jungle.\"\n    },\n    {\n      \"scene_number\": 5,\n       \"duration\": 5,\n       \"imagePrompt\":\"A close-up on the face of the old mariner, his eyes wide with a mixture of wonder and trepidation as he reads the journal. He has stubbled white beard and weathered face. Soft light reflecting from the journal on his face. Realistic portrait, focus on the eyes.\",\n      \"contextText\": \"The mariner, captivated by the journal's stories, begins to believe the tales are real.\"\n    },\n      {\n        \"scene_number\": 6,\n        \"duration\": 5,\n        \"imagePrompt\":\"A wide shot showing the mariner, now determined, standing at the bow of a small, weathered sailing boat on a calm sea, the sun just beginning to rise over the horizon. He’s holding the journal. The overall scene is full of soft, warm light. Realistic landscape, focus on the boat.\",\n        \"contextText\": \"Inspired, he embarks on a quest to find the places described in the journal, starting on a new adventure.\"\n      },\n       {\n        \"scene_number\": 7,\n        \"duration\": 3,\n          \"imagePrompt\":\"A final shot looking up at the open chest, empty now, as waves gently wash over the sand. The setting sun reflects on the wet sand. Realistic, melancholic and reflective.\",\n        \"contextText\": \"The beach remains, holding its secrets, waiting for the next story to begin.\"\n    }\n  ]\n}\n```\n"},
        ],
      },
    ],
  });
