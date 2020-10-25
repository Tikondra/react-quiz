import React, {Component} from "react";
import {connect} from "react-redux";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import classes from './Quiz.module.scss';
import Loader from "../../components/UI/Loader/Loader";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Выбери верный вариант</h1>
          {
            this.props.loading || !this.props.quiz
            ? <Loader/>
            : this.props.isFinished
              ? <FinishedQuiz
                  results={this.props.results}
                  quiz={this.props.quiz}
                  onRetry={this.props.retryQuiz}
                />
              : <ActiveQuiz
                  question={this.props.quiz[this.props.activeQuestion].question}
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  onAnswerClick={this.props.quizAnswerClick}
                  quizLength={this.props.quiz.length}
                  answerNumber={this.props.activeQuestion + 1}
                  state={this.props.answerState}
                />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.quiz.results,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    isFinished: state.quiz.isFinished,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
