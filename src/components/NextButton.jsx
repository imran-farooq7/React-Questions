const NextButton = ({ dispatch, answer, currentQuestion, questions }) => {
	if (answer === null && currentQuestion > 0) return null;
	if (currentQuestion < questions.length - 1)
		return (
			<button
				className="btn btn-ui"
				onClick={() =>
					dispatch({
						type: "nextQuestion",
					})
				}
			>
				Next
			</button>
		);
	if (currentQuestion === questions.length - 1) {
		return (
			<button
				className="btn btn-ui"
				onClick={() =>
					dispatch({
						type: "finish",
					})
				}
			>
				Finish
			</button>
		);
	}
};
export default NextButton;
