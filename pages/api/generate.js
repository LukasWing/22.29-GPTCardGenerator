import { Configuration, OpenAIApi } from "openai";
import {long} from "./prompts.json"
const debugging = false;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const promptType = req.body.promptType
  const input = req.body.text || '';
  if (input.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter valid text",
      }
    });
    return;
  }
  if(!debugging){
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(input, promptType),
        temperature: 0.6,
      });
      res.status(200).json({ result: completion.data.choices[0].text });
    } catch(error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
          error: {
            message: 'An error occurred during your request.',
          }
        });
      }
    }
  } else
    res.status(200).json({ result: generatePrompt(input, promptType) });
}

function generatePrompt(input, promptType) {
  if(prompt === "Question") {
    console.log(prompt)
    return `${long.goal}
    Text1: ${long.shots[0].text}
    Question1: ${long.shots[0].question}
    
    Text2: ${long.shots[1].text}
    Question2: ${long.shots[1].question}
    
    Text3: ${long.shots[2].text}
    Question3: ${long.shots[2].question}
    
    Text: ${input}
    ${long.ending}`;
  } else if (prompt === "Cloze") {
  }

}
