import { Component } from 'react';

export default class Wave extends Component {
  constructor(props) {
		super(props);
	
		this.state = {
			cx: 0,
			cy: 0,
			wave: false,
		};
		
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
	}
	
	onMouseDown(event) {
    if (event.button === 0) {
	    this.setState({
	      cx: event.offsetX,
	      cy: event.offsetY,
	      wave: true
	    });
	  }
	}
	
	onMouseUp(event) {
    if (event.button === 0 && this.state.wave) {
      this.setState({wave: false});
    }
	}
	
  render() {
    let contStyle = {
      position: 'relative',
      overflow: 'hidden',
      display: 'inline-block'
    };
    
    Object.apply(contStyle, this.props.style)
    
    let waveStyle = {
      borderRadius: '50%',
      backgroundColor: this.state.wave ? 'rgba(50, 50, 50, 0.25)' : "rgba(50, 50, 50, 0)",
      position: 'absolute',
      left: this.state.cx - 150,
      top: this.state.cy - 150,
	    width: 300,
      height: 300,
      transform: this.state.wave ? "scale(1.0, 1.0)" : "scale(0, 0)",
      transition: this.state.wave ? "transform 0.5s ease-out"
        : "background-color 0.45s ease-out,transform 0s 0.45s",
    };
    
    return(
      <div style={contStyle}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}>
        <div style={waveStyle}></div>
        {this.props.children}
      </div>
    );
  }
}
