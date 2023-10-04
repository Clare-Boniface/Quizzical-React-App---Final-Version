import React from "react";
import he from "he";

export default function Answers({ questions, selectedAnswers, handlePlayAgain }) {
    return (
        <div>
            {questions.map((question, questionIndex) => {
                const allAnswers = [question.correct_answer, ...question.incorrect_answers];

                return (
                    <div key={`question-${questionIndex}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="158" height="141" viewBox="0 0 158 141" fill="none" className="lemon-svg"></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="148" height="118" viewBox="0 0 148 118" fill="none" className="babyblue-svg"></svg>
                        <div>
                            <p key={`question-${questionIndex}`} className="question">
                                {he.decode(question.question)}
                            </p>
                            <div className="flex answers">
                                {allAnswers.map((answer, index) => {
                                    const isCorrect = answer === question.correct_answer;
                                    const isSelected = selectedAnswers[questionIndex] === answer;
                                    const isIncorrectGuess = isSelected && !isCorrect;

                                    // Calculate the opacity based on whether the answer is correct or not
                                    const opacity = isCorrect ? 1 : 0.5;

                                    // Define the style object to set opacity
                                    const answerStyle = {
                                        opacity
                                    };

                                    // Define the class names based on correctness and selection
                                    const classNames = ["answer", isCorrect ? "correct-answer" : "", isIncorrectGuess ? "incorrect-answer" : ""].join(" ");

                                    return (
                                        <p
                                            key={`answer-${questionIndex}-${index}`}
                                            className={classNames}
                                            style={answerStyle} // Apply opacity style
                                        >
                                            {he.decode(answer)}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                        <hr />
                    </div>
                );
            })}
            <div className="score-container flex">
                <p className="score-message flex">
                    You scored {selectedAnswers.filter((answer, index) => answer === questions[index].correct_answer).length} /{questions.length} correct answers
                </p>
                <button className="button play-again-btn" onClick={handlePlayAgain}>
                    Play again
                </button>
            </div>
        </div>
    );
}

