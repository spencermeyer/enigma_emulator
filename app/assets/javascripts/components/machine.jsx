class Machine extends React.Component {
//  React.createClass(object)  this will only work with ES6
  constructor(props) {
    super(props);
    this.state = { key_selected: ' ' }
  }
  getInitialState() {
    return { key_selected: '' }
  }
  render() {
    const boardLetters = ['Q','W','E','R','T','Z','U','I','O','A','S','D','F','G','H','J','K','P','Y','X','C','V','B','N','M','L'];

    return (
      <div className="machine">
        <RotorAssembly letter="b" />
        <DisplayBoard letters={boardLetters} />
        <KeyBoard letters={boardLetters} onKeyPressed={ this.handleKeySelected.bind(this) }/>
        <PlugBoard />
      </div>
    )   
  }
  handleKeySelected(value) {
    var ajaxSuccess = this.ajaxSuccess;
    console.log('machine level', value);
    $.ajax({
      url: "/encrypt_key",
      data: { input_key: value },
      success: function(data) { 
        console.log('SUCCESS', data.letter);
        ajaxSuccess(data.letter);
      }
    });
  }
  ajaxSuccess(key) {
    console.log('OK new function', key);
    // this.setState({ key_selected: key }); not working
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
        { 
          this.props.letters.map(
            (individualLetter, index) =>{ return <KeyBoardButton letter={ individualLetter } key={index} onSomeEvent={ this.handleClick.bind(this) } /> })
        }

      </div>
    )
  }
  handleClick(value) { console.log('if only . .. . .', value.target.value); this.props.onKeyPressed(value.target.value ); }
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

class PlugBoard extends React.Component{
    render() {
      return(
        <div className="plug-board">
        </div>
        )
    }
}

