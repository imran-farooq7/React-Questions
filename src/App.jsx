import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import Start from "./components/Start";
import Progress from "./components/Progress";
import Question from "./components/Question";
const intialState = {
	status: "loading",
	questions: [],
	currentQuestion: 0,
	points: 0,
	answer: null,
};
const reducer = (state, action) => {
	if (action.type === "dataRecevied") {
		return {
			...state,
			status: "ready",
			questions: action.payload,
		};
	} else if (action.type === "dataFailed") {
		return {
			...state,
			status: "error",
		};
	} else if (action.type === "start") {
		return {
			...state,
			status: "start",
		};
	} else if (action.type === "newAns") {
		const question = state.questions.at(state.currentQuestion);
		return {
			...state,
			answer: action.payload,
			points:
				action.payload === question.correctOption
					? state.points + question.points
					: state.points,
		};
	}
};

function App() {
	const [{ status, questions, currentQuestion, points, answer }, dispatch] =
		useReducer(reducer, intialState);
	const maxPoints = questions.reduce(
		(prev, current) => prev + current.points,
		0
	);
	useEffect(() => {
		const getQuestions = async () => {
			try {
				const res = await fetch("http://localhost:3000/questions");
				const data = await res.json();
				dispatch({ type: "dataRecevied", payload: data });
			} catch (err) {
				dispatch({ type: "dataFailed" });
			}
		};
		getQuestions();
	}, []);
	return (
		<div className="app">
			<Header />
			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<Start questions={questions.length} dispatch={dispatch} />
				)}
				{status === "start" && (
					<>
						<Progress
							questions={questions}
							currentQuestion={currentQuestion}
							points={points}
							maxPoints={maxPoints}
						/>
						<Question
							question={questions[currentQuestion]}
							dispatch={dispatch}
							answer={answer}
						/>
					</>
				)}
			</Main>
		</div>
	);
}

export default App;
