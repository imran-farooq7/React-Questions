import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import Start from "./components/Start";
const intialState = {
	status: "loading",
	questions: [],
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
	}
};

function App() {
	const [{ status, questions }, dispatch] = useReducer(reducer, intialState);
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
						<Progress />
					</>
				)}
			</Main>
		</div>
	);
}

export default App;
