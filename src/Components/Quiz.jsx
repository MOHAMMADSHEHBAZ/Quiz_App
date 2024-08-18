import React, { useRef, useState } from 'react';
import '../App.css';
import { question } from '../assets/question';

const Quiz = () => {

    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState(question[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const options = [option1, option2, option3, option4];

    const Next = () => {
        if (lock) {
            if (index === question.length - 1) {
                setResult(true);
                return;
            }
            setIndex(prevIndex => {
                const newIndex = prevIndex + 1;
                setQuestions(question[newIndex]);
                return newIndex;
            });
            setLock(false);
            options.forEach((opt) => {
                if (opt.current) {
                    opt.current.classList.remove("incorrect");
                    opt.current.classList.remove("correct");
                }
            });
        }
    };

    const checkAnswer = (e, ans) => {
        if (!lock) {
            if (questions.ans === ans) {
                e.target.classList.add("correct");
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("incorrect");
                options[questions.ans - 1].current.classList.add("correct");
            }
            setLock(true);
        }
    };

    return (
        <div className='container'>
            <h1>Reactjs Quiz</h1>
            <hr />
            {result ? (
                <div className={score >= 3 ? 'goodScore' : 'badScore'}>
                    <h2 className='score'>Your Score: {score} out of {question.length}</h2>
                    <button className='back' onClick={()=>location.reload()}>End</button>
                </div>
            ) : (
                <>
                    <h2>{index + 1}. {questions.question}</h2>
                    <ul>
                        <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>{questions.option1}</li>
                        <li ref={option2} onClick={(e) => checkAnswer(e, 2)}>{questions.option2}</li>
                        <li ref={option3} onClick={(e) => checkAnswer(e, 3)}>{questions.option3}</li>
                        <li ref={option4} onClick={(e) => checkAnswer(e, 4)}>{questions.option4}</li>
                    </ul>
                    <button onClick={Next}>Next</button>
                    <div className='index'>{index + 1} of {question.length} questions</div>
                </>
            )}
        </div>
    );
};

export default Quiz;
