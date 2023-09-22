const Options = ({ question, dispatch, answer }) => {
	const isAnswer = answer !== null;
	return (
		<div className="options">
			{question.options.map((q, i) => {
				return (
					<button
						key={q}
						className={`btn btn-option ${i ? "answer" : ""} ${
							isAnswer
								? i === question.correctOption
									? "correct"
									: "wrong"
								: ""
						}`}
						onClick={() => dispatch({ type: "newAns", payload: i })}
					>
						{q}
					</button>
				);
			})}
		</div>
	);
};
export default Options;
