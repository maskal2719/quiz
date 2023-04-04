import React from 'react';

type ResultPropsType = {
    answer: number
}

const Result: React.FC<ResultPropsType> = ({answer}) => {
    return (
        <div className={'card'}>
            Вы ответили верно на {answer} вопросов
        </div>
    );
};

export default Result;