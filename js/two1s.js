"use strict";

const title = (<h1>Two ones, two twos, two threes, two fours</h1>);
const manual = (<p>You have two 1s, two 2s, two 3s and two 4s at your disposal. <br /> Place them into the spaces in such a way, that there is one other digit between the 1s, two other digits between the 2s etc.</p>);

function GameHeader(props) {
	return (
		<div>
		{props.title}
		{props.manual}
		</div>
		);
}

function InputField(props) {
	return (
		<input 
			type="number" 
			id={props.id} 
			min="1" max="4" 
			onChange={(e) => props.onChange(e)} 
		/>
	);
}


class GameBoard extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this)
		this.state = {
			values: Array(8).fill(""),
		}
	}

	renderDigitInputField(i) {
		return (
			<InputField 
				id={i}
				onChange={this.handleChange}
			/>
		);
	}

	handleChange(e) {
		const values  = this.state.values.slice();
		const fieldId = Number(e.target.id);
		const newvalue = e.target.value;

		values[fieldId] = newvalue;
		this.setState({values: values});
		/*alert(`changed input ${inputId} to ${value}`);*/
		if (this.checkWinCondition(values) === true) {
			alert("Du hast gewonnen!");
		}
	}

	checkWinCondition(values) {
		let winCondition = true;
		/*let state = this.state.values;*/
		for (let i = 1; i<=4; i++) {
			let firstPos = values.indexOf(i.toString());
			if (firstPos + i + 1 > 7) {
				winCondition = false;
				break;
			}
			if (values[firstPos] !== values[firstPos + i + 1]) {
				winCondition = false;
				break;
			} 
		}
		/*alert(winCondition)*/
		return winCondition
	}

	render () {
		return (
			<form autofocus>
			{this.renderDigitInputField(0)}
			{this.renderDigitInputField(1)}
			{this.renderDigitInputField(2)}
			{this.renderDigitInputField(3)}
			{this.renderDigitInputField(4)}
			{this.renderDigitInputField(5)}
			{this.renderDigitInputField(6)}
			{this.renderDigitInputField(7)} 
			</form>)
	}

}


ReactDOM.render(
  <GameHeader title={title} manual={manual} />,
  document.getElementById('gameheader')
);

ReactDOM.render(<GameBoard />, document.getElementById("gameboard"))