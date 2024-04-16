import * as React from 'react';
import { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { post } from 'aws-amplify/api';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import CircularTimer from './CircularTimer';

// Custom Radio Button with Black Color
const BlackRadio = (props) => (
    <Radio
        sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
        {...props}
    />
);

export default function QuestionCard({ subject }) {
    const timerDuration = 60; // 60 seconds;
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showExplanation, setShowExplanation] = useState(false);
    const [disabledAnswers, setDisabledAnswers] = useState([]);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [timerRunning, setTimerRunning] = useState(true);
    const [timerReset, setTimerReset] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const [scores, setScores] = useState({}); // Scores by topic
    const [timeLeftAtAnswer, setTimeLeftAtAnswer] = useState(timerDuration); // Time left when answer is selected

    useEffect(() => {
        (async () => {
            const APIName = "restAPI";
            const apiPath = '/getQuestions';
            try {
                const response = await post({ apiName: APIName, path: apiPath, options: { body: { "subject": subject } } });
                const reply = (await response.response).body;
                const data = await reply.json();
                setQuestions(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, []);

    // Define the callApi function
    async function updateUserWeights(json) {
        const APIName = "restAPI";
        const apiPath = '/updateUserWeights';
        try {
            const response = await post({ apiName: APIName, path: apiPath, options: { body: json } });
            const reply = (await response.response).body;
            const data = await reply.json();
            console.log(data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

    const handleTimerEnd = () => {
        const topic = currentQuestion.topic;

        if (!isAnswerCorrect) {
            setScores(prevScores => ({
                ...prevScores,
                [topic]: {
                    scored: prevScores[topic]?.scored || 1,
                    totalPossible: (prevScores[topic]?.totalPossible || 0) + timerDuration
                }
            }));
            console.log("Time up! No points gained.");
        }

        setTimeUp(true);
        setShowExplanation(true);
        setSelectedAnswer(currentQuestion.correct_answer);
        setDisabledAnswers(Object.keys(currentQuestion.options));
        setTimerReset(true);
    };

    const handleRadioChange = (event) => {
        setSelectedAnswer(event.target.value);
        setShowExplanation(false);
        setIsAnswerCorrect(false);
    };

    const handleCheckAnswer = () => {
        const topic = currentQuestion.topic;

        if (selectedAnswer === currentQuestion.correct_answer) {
            setIsAnswerCorrect(true);
            setTimerRunning(false);

            const initialWrongAttempt = disabledAnswers.length > 0;
            const scoreToAdd = initialWrongAttempt ? 1 : (timeUp ? 1 : timeLeftAtAnswer);
            setScores(prevScores => {
                const newScored = (prevScores[topic]?.scored || 0) + scoreToAdd;
                const newTotalPossible = (prevScores[topic]?.totalPossible || 0) + timerDuration;
                const newPercentage = (newScored / newTotalPossible) * 100;

                return {
                    ...prevScores,
                    [topic]: {
                        scored: newScored,
                        totalPossible: newTotalPossible,
                        percentage: newPercentage.toFixed(2)
                    }
                };
            });

            setDisabledAnswers(Object.keys(currentQuestion.options));
        } else {
            setDisabledAnswers(prev => [...prev, selectedAnswer]);
        }
        setShowExplanation(true);
    };

    const handleNextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
            setSelectedAnswer('');
            setShowExplanation(false);
            setDisabledAnswers([]);
            setIsAnswerCorrect(false);
            setTimerReset(true);
            setTimeUp(false);
            setTimerRunning(true);
            setTimeLeftAtAnswer(timerDuration);
        } else {
            handleFinishQuiz();
        }
    };

    useEffect(() => {
        if (timerReset) {
            setTimerReset(false);
        }
    }, [timerReset]);

    if (!currentQuestion) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', margin: '30px' }}>
                <Typography component="div" variant="h6">
                    {<Skeleton width="5%" height={30} />}
                </Typography>
                <Typography component="div" variant="h6" style={{ marginBottom: 20 }}>
                    {<Skeleton width="70%" height={30} />}
                </Typography>
                {[1, 2, 3, 4].map((option) => (
                    <Typography component="div" key={option} variant="h5" style={{ marginBottom: 10 }}>
                        {<Skeleton width="100%" height={60} />}
                    </Typography>
                ))}
                <Typography component="div" variant="h6" style={{ marginBottom: 20 }}>
                    {<Skeleton width="100%" height={65} />}
                </Typography>
            </div>
        );
    }

    const handleFinishQuiz = () => {
        console.log("Quiz completed.");
        console.log("Final Scores:", scores);
        updateUserWeights(scores);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', justifyContent: 'center', gap: '10px' }}>
            <CircularTimer duration={timerDuration} running={timerRunning} reset={timerReset} onTimerEnd={handleTimerEnd} onTimeUpdate={(time) => setTimeLeftAtAnswer(time)} />
            {showExplanation && (
                <div style={{ marginBottom: '20px', padding: '20px', borderRadius: '10px', backgroundColor: timeUp ? '#ffff99' : (selectedAnswer === currentQuestion.correct_answer ? '#acd2cc' : '#fcbca0') }}>
                    {timeUp ? `Time up! ${currentQuestion.explanation[currentQuestion.correct_answer]}` : currentQuestion.explanation[selectedAnswer]}
                </div>
            )}

            <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Question {currentQuestionIndex + 1}: </p>
                <p style={{ marginBottom: '10px' }}> {currentQuestion.question}</p>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', marginLeft: '11px', marginRight: '-11px' }}>
                <FormControl fullWidth>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={selectedAnswer}
                        name="radio-buttons-group"
                        onChange={handleRadioChange}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        {Object.entries(currentQuestion.options).map(([key, value]) => (
                            <FormControlLabel
                                key={key}
                                value={key}
                                control={<BlackRadio disabled={disabledAnswers.includes(key) || timeUp} />}
                                label={value}
                                sx={{
                                    width: '100%',
                                    border: '1px solid black',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    '&:hover': {
                                        backgroundColor: 'lightgray',
                                    },
                                    '.MuiFormControlLabel-label': {
                                        flexGrow: 1
                                    }
                                }}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>
            <button
                style={{ marginTop: '20px', padding: '10px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '4px' }}
                onClick={(isAnswerCorrect || timeUp) ? handleNextQuestion : handleCheckAnswer}
            >
                {((isAnswerCorrect || timeUp) ? ((currentQuestionIndex + 1 === questions.length) ? "Finish Quiz" : "Next Question") : "Check Answer")}
            </button>
        </div>
    );
}
