import React from 'react';

type ResultPropsType = {
    answer: number
    reset: () => void
}

const Result: React.FC<ResultPropsType> = ({answer, reset}) => {
    return (
        <>
            <div className={'card'}>
                you answered {answer} questions correctly
            </div>
            <div>Do you want to play again?</div>
            <button onClick={reset}>Reset and play again</button>
        </>
    );
};

export default Result;