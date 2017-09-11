class Machine extends React.Component {
  render() {
    const boardLetters = ['Q','W','E','R','T','Z','U','I','O','A','S','D','F','G','H','J','K','P','Y','X','C','V','B','N','M','L'];
    return (
      <div>
        <RotorAssembly letter="b" />
        <DisplayBoard letters={boardLetters} />
        <KeyBoard letters={boardLetters} />
      </div>
    )   
  }
}

class RotorAssembly extends React.Component {
  render() {
    return(
      <div className='rotor-assembly'>
        <Rotor letter={"H"} />
        <Rotor letter={"Z"} />
        <Rotor letter={"P"} />
      </div>
      );
  }
}

class Rotor extends React.Component{
  render() {
    return(
      <div className="oval">
        <p className="rotor-letter">{this.props.letter}</p>
      </div>
    );
  }  
};

class DisplayBoard extends React.Component{
  render() {
    return(
        <div className="display-board">
          { this.props.letters.map(function(individualLetter, index){
            return <DisplayBoardLetter key={index} letter={individualLetter} />
          }) }
        </div>
      );
  }
}

class DisplayBoardLetter extends React.Component{
  render(){
    return (
        <div className="lamp-board-letter">
          <button type="button" className={"lamp-button" + " " + this.props.letter}>{ this.props.letter }</button>
        </div>
      )
  }
}

class KeyBoard extends React.Component{
  render() {
    return (
      <div className = 'keyboard'>
        <KeyBoardButton letter='f' key='1' onSomeEvent={ this.handleClick.bind(this) }  awooga='single' />
      </div>
    )
  }
  handleClick(value) { console.log('if only . .. . .', value.target.value); }
}

class KeyBoardButton extends React.Component{
  componentWillMount() { this.setState({letter: this.props.letter})  }
  render() {
    var that=this;
    return (
        <div className="key-board-letter">
          <button type="button" value={this.state.letter} onClick={this.props.onSomeEvent } className={"key-button" + " " + this.props.letter} >{ this.props.letter }</button>
        </div>
    )
  }
}


