import axios from 'axios';
import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import QuestionCard from "./Components/QuestionCard";
import Result from "./Components/Result";
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export type Question = {
    question: string
    answers: Answer[]
    correct_answer: number
}
export type Answer = {
    id: number
    answer: string
}

export interface ResponseType {
    response_code: number;
    results: Result[];
}

export interface Result {
    category: Category;
    type: Type;
    difficulty: Difficulty;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers?: string[]
}

export enum Category {
    Art = "Art",
}

export enum Difficulty {
    Easy = "easy",
    Hard = "hard",
    Medium = "medium",
}

export enum Type {
    Boolean = "boolean",
    Multiple = "multiple",
}

function App() {

    const [questions, setQuestions] = useState<Result[] | null>([])
    const [category, setCategory] = useState(9)
    const [numberOfQuestions, setnumberOfQuestions] = useState<number>(5)
    const [difficult, setDifficult] = useState<string>('easy')
    const [step, setStep] = useState(0)
    const [answer, setAnswer] = useState(0)
    const [startGame, setStartGame] = useState<boolean>(false)
    const question = questions![step]

    const getQuestions = () => {
        axios.get<ResponseType>(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficult}`)
            .then(resp => {
                setQuestions(resp.data.results.map((el) => ({
                    ...el,
                    answers: el.incorrect_answers.concat(el.correct_answer).sort(() => Math.random() - 0.5)
                })))
            })
        setStartGame(true)
    }

    useEffect(getQuestions, [])

    const selectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(+e.currentTarget.value)
    }
    const selectDifficult = (e: ChangeEvent<HTMLSelectElement>) => {
        setDifficult(e.currentTarget.value)
    }
    const changeNumberOfQuestions = (e: ChangeEvent<HTMLInputElement>) => {
        setnumberOfQuestions(+e.currentTarget.value)
        console.log(+e.currentTarget.value)
    }
    const nextQuestion = (id: string) => {
        setStep(step + 1)
        if (id === question.correct_answer) {
            setAnswer(answer + 1)
        }
    }
    const reset = () => {
        setCategory(1)
        setStep(0)
        setAnswer(0)
        setStartGame(false)
    }


    return (
        <div className="main">
            <div className={'setting'} style={startGame ? {display: 'none'} : {display: "flex"}}>
                <div>
                    <p>Select Category :</p>
                    <select name="trivia_category" className="form-control" onChange={selectCategory}>
                        <option value="any">Any Category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals &amp; Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science &amp; Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                        <option value="32">Entertainment: Cartoon &amp; Animations</option>
                    </select>
                </div>
                <div>
                    <p>Select Difficult :</p>
                    <select onChange={selectDifficult} name="trivia_difficulty" className="form-control">
                        <option value="any">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div>
                    <p>Number of Questions:</p>
                    <input onChange={changeNumberOfQuestions} value={numberOfQuestions} type="number" min={1}/>
                </div>
                <button onClick={() => getQuestions()}>Begin</button>
            </div>
            {
                step !== questions?.length ?
                    <QuestionCard question={question!} nextQuestion={nextQuestion} questions={questions!}
                                  step={step}/> : <Result answer={answer} reset={reset}/>
            }
            {/*<div>Choose a category, difficulty and number of questions</div>*/}
        </div>
    );
}

export default App;
