import Options from "./Options";

const Question = ({ question, dispatch, answer }) => {
	console.log(question);
	return (
		<div>
			<h2>{question.questions}</h2>
			<Options question={question} dispatch={dispatch} answer={answer} />
		</div>
	);
};
export default Question;
