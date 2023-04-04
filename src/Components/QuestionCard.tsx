import React from 'react';
import {Question, Result} from "../App";

type QuestionCardPropsType = {
    question: Result
    nextQuestion: (index: string) => void
    questions: Result[]
    step: number
}

const QuestionCard: React.FC<QuestionCardPropsType> = ({question, nextQuestion, questions, step}) => {

    return (
        <div className={'card'}>
            <div>Вопрос номер {step} из {questions.length}</div>
            <div className={'questions'}>
                <h2>{question?.question}</h2>
                <ul>
                    {
                        question?.answers?.map((el, index) =>
                            <li key={index} className={'question'} onClick={() => nextQuestion(el)}>{el}</li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default QuestionCard;