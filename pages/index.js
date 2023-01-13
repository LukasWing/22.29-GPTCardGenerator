import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("Question");
  const [result, setResult] = useState();

  const handleOptionChange = (changeEvent) => {
    setSelectedOption(changeEvent.target.value);
  }

  async function onSubmit(event) {
    event.preventDefault();
    console.log("submitting", textInput);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput, prompt: selectedOption}),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
    
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/noun-flash-cards.svg" />
      </Head>

      <main className={styles.main}>
        <img src="/noun-flash-cards.svg" className={styles.icon} />
        <h3>Flashcard Question Generator</h3>
        <form onSubmit={onSubmit}>
          <textarea
            resize="none" 
            type="text"
            name="text"
            maxLength={510}
            placeholder="Enter text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <input type="submit" value="Generate Question" />
        </form>
        <form>
        <label>
          <input
            type="radio"
            value="Question"
            checked={selectedOption === 'Question'}
            onChange={handleOptionChange}
          />
          Question
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="Cloze"
            checked={selectedOption === 'Cloze'}
            onChange={handleOptionChange}
          />
          Cloze
        </label>
        <br />
      </form>
        {result && (
          <div>
           <textarea
           resize="none"
           type="question"
           name="question"
           maxLength={510}
           value={result}
           onChange={(e) => setResult(e.target.value)}
         />
         <br/>
         <button onClick={() => navigator.clipboard.writeText(result)}>Copy to Clipboard</button>
         </div>
        )}

    
      </main>
    </div>
  );
}
