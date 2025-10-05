import { createContext, useState } from "react";
import runGemini from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [darkMode, setDarkMode] = useState(true); // default light mode

    // Typing effect helper
    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    // Start a new chat (plus icon)
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    // Send prompt
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;
        if (prompt !== undefined) {
            response = await runGemini(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await runGemini(input);
        }

        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("<br>");

        // Typing effect
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("");
    };

    // Copy result to clipboard
    const copyResult = () => {
        if (resultData.trim() !== "") {
            const plainText = resultData.replace(/<[^>]+>/g, "");
            navigator.clipboard.writeText(plainText);
        }
    };

    // Voice input
    const startVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Your browser does not support voice input");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();
        setIsRecording(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);   // Set input
            onSent(transcript);     // Auto-send
            setIsRecording(false);
        };

        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
    };

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        copyResult,
        darkMode,
        toggleDarkMode,
        startVoiceInput,
        isRecording
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
