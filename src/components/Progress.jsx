const Progress = ({ questions, currentQuestion, points, maxPoints }) => {
	return (
		<header className="progress">
			<progress value={currentQuestion} max={questions.length} />
			<p>
				Questions <strong>{currentQuestion + 1}</strong>/{questions.length}
			</p>
			<p>
				Points <strong>{points}</strong> / {maxPoints}
			</p>
		</header>
	);
};
export default Progress;
