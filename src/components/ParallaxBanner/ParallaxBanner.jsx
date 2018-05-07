import React, { Component } from 'react';

class ParallaxBanner extends Component {
  render() {
    return(
      <div 
        className="parallax"
        id={this.props.id | null}
        style={
          Object.assign({}, this.props.style, {
            backgroundImage: `url(${this.props.src})`
          })
        }></div>
    );
  }
}

export default ParallaxBanner;
