import React, { useState, useEffect } from "react";
import Answers from "./components/Answers";
import Intro from "./components/Intro";
import Questions from "./components/Questions";
import categories from "./categories";
import shuffleArray from "./utils";

export default function App() {
    const [questions, setQuestions] = useState([]); // array stores quiz questions and their answers
    const [showQuestions, setShowQuestions] = useState(false); // boolean whether to display quiz questions
    const [showAnswers, setShowAnswers] = useState(false); // boolean whether to display answers
    const [selectedAnswers, setSelectedAnswers] = useState([]); // array keeps track of user's selected answers for each question
    const [topic, setTopic] = useState(""); // Stores current quiz topic
    const [selectedTopic, setSelectedTopic] = useState("... Choose your speciality subject ..."); //Initialize with a default value for the selected topic

    // Quiz questions are fetched when the app starts
    useEffect(() => {
        if (selectedTopic !== "... Choose your speciality subject ..." && selectedTopic !== "") {
            fetchQuestions(selectedTopic);
        }
    }, [selectedTopic]);

    // Initialize the selectedAnswers array with null values for each question
    useEffect(() => {
        setSelectedAnswers(Array.from({length: questions.length}));
    }, [questions]);

    function fetchQuestions(selectedCategory) {
        let apiUrl = "https://opentdb.com/api.php?amount=5";

        if (selectedCategory !== "Any Category") {
            const selectedCategoryValue = categories.find((category) => category.name === selectedCategory);

             apiUrl += `&category=${selectedCategoryValue.value}`;
            
        }
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                const shuffledQuestions = data.results.map((question) => {
                    const allAnswers = [question.correct_answer, ...question.incorrect_answers];
                    const shuffledAnswers = shuffleArray(allAnswers);

                    return {
                        ...question,
                        answers: shuffledAnswers,
                    };
                });
                setQuestions(shuffledQuestions);
                setTopic(selectedTopic);
            });
    }

    const handleStartQuizClick = () => {
        if (selectedTopic.includes('...')) {
            // Show a message or alert to remind the user to select a subject
            alert("Please select a speciality subject.");
        } else {
            setShowQuestions(true);
            handleSelectCategory(selectedTopic);
        }
    };

    // Displays the answers page when the check answers button is clicked
    function handleCheckAnswers() {
        setShowAnswers(true);
        setShowQuestions(false);
    }

    // Updates the selectedAnswers array when a user selects an answer for a question
    function handleAnswerClick(questionIndex, answer) {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = answer;
        setSelectedAnswers(newSelectedAnswers);
    }

    function handleSelectCategory(category) {
        setSelectedTopic(category);
    }

    // Resets the game by resetting state and fetches new quiz questions
    function handlePlayAgain() {
        setShowQuestions(false);
        setShowAnswers(false);
        setSelectedAnswers(new Array(questions.length).fill(null));
        fetchQuestions(selectedTopic);

        // Shuffle the answers for each question again
        const shuffledQuestions = questions.map((question) => {
            const shuffledAnswers = shuffleArray(question.answers);
            return {
                ...question,
                answers: shuffledAnswers,
            };
        });
        setQuestions(shuffledQuestions);
    }
    const showIntro = !showQuestions && !showAnswers
    return (
        <div>
            {showIntro && <Intro handleStartQuizClick={handleStartQuizClick} setTopic={setTopic} setSelectedTopic={setSelectedTopic} selectedTopic={selectedTopic} handleSelectCategory={handleSelectCategory} />}
            
            {showQuestions && <Questions questions={questions} handleAnswerClick={handleAnswerClick} selectedAnswers={selectedAnswers} showQuestions={setShowQuestions} handleCheckAnswers={handleCheckAnswers} />}{" "}
            
            {showAnswers && (
                <Answers questions={questions} showAnswers={showAnswers} setShowAnswers={setShowAnswers} handleCheckAnswers={handleCheckAnswers} selectedAnswers={selectedAnswers} handlePlayAgain={handlePlayAgain} setTopic={setTopic} />
            )}
            
        </div>
    );
}


