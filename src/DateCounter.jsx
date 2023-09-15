import { useReducer, useState } from "react";
const initialState = {
	count: 0,
	step: 1,
};
// const Action = {
// 	type,
// 	payload,
// };
const reducer = (state, action) => {
	if (action.type === "inc") {
		return {
			...state,
			count: state.count + state.step,
		};
	} else if (action.type === "dec") {
		return {
			...state,
			count: state.count - state.step,
		};
	} else if (action.type === "step") {
		return {
			...state,
			step: action.payload,
		};
	} else if (action.type === "reset") {
		return initialState;
	}
};

function DateCounter() {
	// const [count, setCount] = useState(0);
	const [state, dispatch] = useReducer(reducer, initialState);
	// const [step, setStep] = useState(1);

	// This mutates the date object.
	const date = new Date("june 21 2027");
	date.setDate(date.getDate() + state.count);

	const dec = function () {
		// setCount((count) => count - 1);
		// setCount((count) => count - step);
		dispatch({ type: "dec", payload: 1 });
	};

	const inc = function () {
		// setCount((count) => count + 1);
		// setCount((count) => count + step);
		dispatch({
			type: "inc",
			payload: 1,
		});
	};

	const defineCount = function (e) {
		setCount(Number(e.target.value));
	};

	const defineStep = function (e) {
		// setStep(Number(e.target.value));
		dispatch({ type: "step", payload: Number(e.target.value) });
	};

	const reset = function () {
		// setCount(0);
		// setStep(1);
		dispatch({ type: "reset" });
	};

	return (
		<div className="counter">
			<div>
				<input
					type="range"
					min="0"
					max="10"
					value={state.step}
					onChange={defineStep}
				/>
				<span>{state.step}</span>
			</div>

			<div>
				<button onClick={dec}>-</button>
				<input value={state.count} onChange={defineCount} />
				<button onClick={inc}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	);
}
export default DateCounter;
