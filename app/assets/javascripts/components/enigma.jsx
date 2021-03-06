class Enigma extends React.Component {
	constuctor(props) {
	}
	render() {
		return (
			<div className="enigma">
				<Case/>	
			</div>)
	}
}

class Case extends React.Component {
	render() {
		return (
			<div className='case'>
				<Machine/>
			</div>
			)
	}
}


class Machine extends React.Component {
  constructor(props) {
    super(props);
    this.state = { returned_key: '', rotor1_value: 'A', rotor2_value: 'B', rotor3_value: 'C', history: '', encrypted_history: '' };
    this.ajaxSuccess = this.ajaxSuccess.bind(this);
  }

  render() {
    const boardLetters = ['Q','W','E','R','T','Z','U','I','O','A','S','D','F','G','H','J','K','P','Y','X','C','V','B','N','M','L'];

    return (
      <div className="machine">
        <RotorAssembly letter1={ this.state.rotor1_value } letter2 = { this.state.rotor2_value} letter3 = { this.state.rotor3_value } />
        <Switch />
        <DisplayBoard letters={boardLetters} key_to_light = { this.state.returned_key } />
        <KeyBoard letters={boardLetters} onKeyPressed={ this.handleKeySelected.bind(this) }/>
        <PlugBoard />
        <ResetButton/>
        <TextHistoryArea history = { this.state.encrypted_history } />
        <TextEntyArea history = {this.state.history }/>
      </div>
    )   
  }

  handleKeySelected(value) {
  	this.state.history = this.state.history.concat(value);
    console.log('handling key selected at Machine Level');
    var ajaxSuccess = this.ajaxSuccess;
    console.log('machine level', value);
    $.ajax({
      url: "/encrypt_key",
      data: { input_key: value },
      success: function(data) { 
        console.log('SUCCESS', data);
        ajaxSuccess(data.letter, data.window1_letter);
      }
    });
  }
  ajaxSuccess(key, window1) {
    console.log('OK in AJAX return function', key, window1 );
    var newEncryptedHistory = this.state.encrypted_history.concat(key);
    this.setState({ returned_key: key, rotor1_value: window1, encrypted_history: newEncryptedHistory });
    // this does not work quickly enough , it is one key behind.
  }
}

class RotorAssembly extends React.Component {
  render() {
    return(
      <div className='rotor-assembly'>
        <Rotor letter={ this.props.letter3 } />
        <Rotor letter={ this.props.letter2 } />
        <Rotor letter={ this.props.letter1 } />
      </div>
      );
  }
}

class Rotor extends React.Component {
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
}

class Switch extends React.Component {
  render() {
    return(
      <div className='switch'>
        <div className='switch-mask'></div>
      </div>
    );
  }  
}

class DisplayBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { key_to_light: '', last_key: '' }
  }

  render() {
    return(
        <div className="display-board">
          { this.props.letters.map(function(individualLetter, index){
            return <DisplayBoardLetter key={index} letter={individualLetter} 
            key_to_light={this.props.key_to_light} />
          }, this)}
        </div>
      );
  }
}

class DisplayBoardLetter extends React.Component {
  render(){
    return (
        <div className='lamp-board-letter'>
          <button type="button" className={ "lamp-button" + " " + this.props.letter}>{ this.props.letter }
          </button>
        </div>
      )
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('DisplayBoard letter component did update');
    if(this.props.key_to_light == this.props.letter) { 
      console.log('Im spartacus', this.props.letter);
      $(".lamp-button.lit").removeClass('lit');
      $(`.lamp-button.${this.props.letter}`).addClass("lit");
      setTimeout(function(){
        $(`.lamp-button.${this.props.letter}`).removeClass("lit");
      }.bind(this), 950);
    }
  }
}

class KeyBoard extends React.Component {
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
  handleClick(value) {
    console.log('clicked:', value.target.value);
    this.props.onKeyPressed(value.target.value);
  }
}

class KeyBoardButton extends React.Component {
  componentWillMount() { this.setState({letter: this.props.letter})  }
  render() {
    var that=this;
    return (
        <div className="key-board-letter">
          <button type="button" value={this.state.letter} onClick={this.props.onSomeEvent} className={"key-button" + " " + this.props.letter} >{ this.props.letter }</button>
        </div>
    )
  }
}

class PlugBoard extends React.Component {
    render() {
      return(
        <div className="plug-board">
        </div>
        )
    }
}

class ResetButton extends React.Component {
    render() {
      return(
        <div className="reset-button">
          <button type="button"  onClick={this.reset}>Reset</button>
        </div>
        )
    }
    reset() {
        console.log('RESET PRESSED');
        $.ajax({
          url: "/encrypt_key",
          data: { reset: true },
          success: function(data) { 
            console.log('RESETTING');
            ajaxSuccess(data.letter, data.window1_letter);
          }
        });
      }
      ajaxSuccess(key, window1) {
        console.log('RESETTING', key, window1 );
        this.setState({ returned_key: 'A', rotor1_value: window1 });
      }
}

class TextHistoryArea extends React.Component {
  render() {
    return(
      <div className="text-history">
        <p>{ this.props.history }</p>
      </div>
      )
  }
}

class TextEntyArea extends React.Component {
    render() {
      return(
        <div className="text-entry">
        	<p>{ this.props.history }</p>
        </div>
        )
    }
}

