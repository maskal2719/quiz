import React from 'react';
import {Question} from "../App";

type QuestionCardPropsType = {
    question: Question
    nextQuestion: (index: number) => void
    questions: Question[]
    step: number
}

const QuestionCard: React.FC<QuestionCardPropsType> = ({question, nextQuestion, questions, step}) => {

    const progress = Math.round((step / questions.length) * 100)

    return (
        <div className={'card'}>
            <div style={{width: `${progress}%`}} className={'bar'}></div>
            <div>Вопрос номер {step + 1} из {questions.length}</div>
            <div className={'questions'}>
                <h2>{question.question}</h2>
                <ul>
                    {
                        question.answers.map((el, index) =>
                            <li className={'question'} key={el} onClick={() => nextQuestion(index)}>{el}</li>
                        )
                    }
                </ul>
            </div>

        </div>
    );
};

export default QuestionCard;