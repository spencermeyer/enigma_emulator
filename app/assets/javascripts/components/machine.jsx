class Machine extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <Rotor letter="b" />
        <DisplayBoard />
        <KeyBoard />
      </div>
    )   
  }
}

class Rotor extends React.Component{
  render() {
    return(
      <p>RotorX letter {this.props.letter} </p>
    );
  }  
};

class DisplayBoard extends React.Component{
  render() {
    const displayBoardLetters = ['Q','W','E','R','T','Z','U','I','O','A','S','D','F','G','H','J','K','P','Y','X','C','V','B','N','M','L'];
    return(
        <div className="display-board">
          { displayBoardLetters.map(function(individualLetter){
            return <DisplayBoardLetter letter={individualLetter} />
          }) }
        </div>
      );
  }
}

const DisplayBoardLetter = React.createClass({
  render: function(){
    return (
        <div className="lamp-board-letter">
          <button type="button" className={"key-button" + " " + this.props.letter}>{ this.props.letter }</button>
        </div>
      )
  }
})

const KeyBoard = React.createClass({
  render: function(){
    return (
      <div className = 'keyboard'>
      </div>
      )
  }
})

const KeyBoardButton = React.createClass({
  render: function(){
    return (
        <div className="key-board-letter">

        </div>
      )
  }
})

// try this    eslint app/assets/javascritps/components/machine.jsx