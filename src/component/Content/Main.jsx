import React, { useContext } from "react";
import './Main.css';
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { FiClipboard } from "react-icons/fi";


const Main = () => {
    const { 
        onSent, 
        recentPrompt, 
        showResult, 
        loading, 
        resultData, 
        setInput, 
        input, 
        copyResult,
        darkMode, 
        toggleDarkMode, 
        startVoiceInput, 
        isRecording 
    } = useContext(Context);

    // Card click handler
    const handleCardClick = (text) => {
        setInput(text);   // input box me text set ho jaye
        onSent(text);     // auto-send ho jaye
    };

    return (
        <div className={`main ${darkMode ? "dark" : ""}`}>
            <div className="nav">
                <p>RahulGemi</p>
                <div className="dark-toggle" onClick={toggleDarkMode}>
                    {darkMode ? "🌙" : "☀️"}
                </div>
                <img src={assets.rahul_icon} alt="" />
            </div>

            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Rahul.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => handleCardClick("Suggest beautiful places to see on an upcoming road trip")}>
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>

                            <div className="card" onClick={() => handleCardClick("Briefly summarize this concept: urban planning")}>
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>

                            <div className="card" onClick={() => handleCardClick("Brainstorm team bonding activities for our work retreat")}>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>

                            <div className="card" onClick={() => handleCardClick("Tell me about React js and React native")}>
                                <p>Tell me about React js and React native</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className="loader">
                                    <hr/>
                                    <hr/>
                                    <hr/>
                                </div>
                            ) : (
                                <div className="result-container">
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                    <FiClipboard className="copy-icon" onClick={copyResult} />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className={`search-box ${darkMode ? "dark" : ""}`}>
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type="text"  
                            placeholder="Enter a prompt here" 
                        />
                        <div>
                            <img 
                                style={{ filter: darkMode ? "brightness(1.5) invert(1)" : "none" }} 
                                src={assets.gallery_icon} 
                                alt="" 
                            />
                            <img 
                                onClick={startVoiceInput} 
                                src={assets.mic_icon} 
                                alt="mic" 
                                style={{ 
                                    filter: isRecording 
                                        ? "invert(50%) sepia(100%) saturate(500%) hue-rotate(180deg)" 
                                        : darkMode 
                                            ? "brightness(1.5) invert(1)"  
                                            : "none" 
                                }}
                            />
                            {isRecording && <p style={{ color: darkMode ? "#fff" : "#000", marginLeft: '5px' }}>Listening...</p>}
                            {input?.trim() !== "" && (
                                <img
                                    onClick={() => onSent()}
                                    src={assets.send_icon}
                                    alt="send"
                                    className="send-icon"
                                />
                            )}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
