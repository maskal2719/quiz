import React from 'react';
import {Question, Result} from "../App";

type QuestionCardPropsType = {
    question: Result
    nextQuestion: (index: number) => void
    questions: Result[]
    step: number
}

const QuestionCard: React.FC<QuestionCardPropsType> = ({question, nextQuestion, questions, step}) => {

    // const progress = Math.round((step / questions?.length) * 100)

    return (
        <div className={'card'}>
            <div  className={'bar'}></div>
            {/*<div>Вопрос номер {step + 1} из {questions.length}</div>*/}
            <div className={'questions'}>
                <h2>{question?.question}</h2>
                <ul>
                    {
                        question?.incorrect_answers?.map((el,index) =>
                            <li className={'question'}  onClick={() => nextQuestion(index)}>{el}</li>
                        )
                    }
                </ul>
            </div>

        </div>
    );
};

export default QuestionCard;