import React, {useState} from 'react';
import './App.css';
import QuestionCard from "./Components/QuestionCard";
import Result from "./Components/Result";

export type Question = {
    question: string
    answers: string[]
    correct_answer: number
}

function App() {

    const questions : Question[] = [
        {
            question: 'How are you?',
            answers: ['ok','net', 'gavno'],
            correct_answer: 0
        },
        {
            question: 'What is react?',
            answers: ['ok','net', 'gavno'],
            correct_answer: 0
        },
        {
            question: 'How many money?',
            answers: ['ok','net', 'gavno'],
            correct_answer: 0
        }
    ]

    const [step, setStep] = useState(0)
    const [answer, setAnswer] = useState(0)
    const question = questions[step]

    const nextQuestion = (index: number) => {
        setStep(step + 1)
        if(index === question.correct_answer) {
            setAnswer(answer + 1)
        }
    }

    return (
        <div className="App">
            {
                step !== questions.length ? <QuestionCard question={question} nextQuestion={nextQuestion} questions={questions} step={step}/> : <Result/>
            }
        </div>
    );
}

export default App;
