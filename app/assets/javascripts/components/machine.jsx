var Machine = React.createClass({
  getInitialState() {
    return { returned_key: '', rotor1_value: 'A', rotor2_value: 'B', rotor3_value: 'C' }
  },
  render() {
    const boardLetters = ['Q','W','E','R','T','Z','U','I','O','A','S','D','F','G','H','J','K','P','Y','X','C','V','B','N','M','L'];

    return (
      <div className="machine">
        <RotorAssembly letter1={ this.state.rotor1_value } letter2 = { this.state.rotor2_value} letter3 = { this.state.rotor3_value } />
        <DisplayBoard letters={boardLetters} key_to_light = { this.state.returned_key } />
        <KeyBoard letters={boardLetters} onKeyPressed={ this.handleKeySelected }/>
        <PlugBoard />
        <ResetButton />
      </div>
    )   
  },
  handleKeySelected(value) {
    var ajaxSuccess = this.ajaxSuccess;
    //console.log('machine level', value);
    $.ajax({
      url: "/encrypt_key",
      data: { input_key: value },
      success: function(data) { 
        console.log('SUCCESS', data);
        ajaxSuccess(data.letter, data.window1_letter);
      }
    });
  },
  ajaxSuccess(key, window1) {
    console.log('OK in AJAX return function', key, window1 );
    this.setState({ returned_key: key, rotor1_value: window1 });
  }
})

class RotorAssembly extends React.Component {
  render() {
    return(
      <div className='rotor-assembly'>
        <Rotor letter={ this.props.letter1 } />
        <Rotor letter={ this.props.letter2 } />
        <Rotor letter={ this.props.letter3 } />
      </div>
      );
  }
}

var Rotor = React.createClass({
  render() {
    return(
      <div className='rotor'>
        <div className="oval">
          <p className="rotor-letter">{this.props.letter}</p>
        </div>
        <div className='finger-wheel'>
          <p></p>
        </div>
      </div>
    );
  }  
});

var DisplayBoard = React.createClass({
  getInitialState() {
    return { key_to_light: '' }
  },
  render() {
    return(
        <div className="display-board">
          { this.props.letters.map(function(individualLetter, index){
            return <DisplayBoardLetter key={index} letter={individualLetter} key_to_light={this.props.key_to_light} />
          }, this)}
        </div>
      );
  }
});

var DisplayBoardLetter = React.createClass({
  render(){
    return (
        <div className='lamp-board-letter'>
          <button type="button" className={ "lamp-button" + " " + this.props.letter}>{ this.props.letter }</button>
        </div>
      )
  },
  componentDidUpdate(prevProps, prevState) {
    //console.log('DisplayBoard letter component did update');
    if(this.props.key_to_light == this.props.letter) { 
      //console.log('Im spartacus', this.props.letter);
      $(`.lamp-button.${this.props.letter}`).addClass("lit");
      setTimeout(function(){
        $(`.lamp-button.${this.props.letter}`).removeClass("lit");
         //console.log("after setTimeout");
      }.bind(this), 950);
    }
  }
});

var KeyBoard = React.createClass({
  render() {
    return (
      <div className = 'keyboard'>
        { 
          this.props.letters.map(
            (individualLetter, index) =>{ return <KeyBoardButton letter={ individualLetter } key={index} onSomeEvent={ this.handleClick } /> })
        }
      </div>
    )
  },
  handleClick(value) {
    this.props.onKeyPressed(value.target.value );
  }
});

var KeyBoardButton = React.createClass({
  componentWillMount() { this.setState({letter: this.props.letter})  },
  render() {
    var that=this;
    return (
        <div className="key-board-letter">
          <button type="button" value={this.state.letter} onClick={this.props.onSomeEvent} className={"key-button" + " " + this.props.letter} >{ this.props.letter }</button>
        </div>
    )
  }
});

var PlugBoard = React.createClass({
    render() {
      return(
        <div className="plug-board">
        </div>
        )
    }
});

var ResetButton = React.createClass({
    render() {
      return(
        <div className="reset_button">
          <button type="button"  onClick={this.props.reset}>Reset</button>
        </div>
        )
    },
    reset() {
        $.ajax({
          url: "/encrypt_key",
          data: { reset: true },
          success: function(data) { 
            console.log('RESETTING');
            ajaxSuccess(data.letter, data.window1_letter);
          }
        });
      },
      ajaxSuccess(key, window1) {
        console.log('RESETTING', key, window1 );
        this.setState({ returned_key: 'A', rotor1_value: window1 });
      }
});


