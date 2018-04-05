import React from 'react';
import ReactDOM from 'react-dom';

class HomePage extends React.Component {
	render() {
		return(
		<a href= "login.html">Login</a>
		<div>
			<img src= "343photo.jpg" alt= "dave's bistro" width="350" height="350">
			<h2>Daves Bistro</h2>
			<a href= "reservation.html">Make a reservation</a>
			<div id="sec1"> <!--left side of index page-->
				<h3>Aboud Daves Bistro</h3>
				<p>This section should discuss what the restaruant is about</p>
			</div>
			<div id= "sec2"><!--right side of index page -->
				<h3>More Images of Daves Bistro</h3>
				<img src="food1.jpg" alt="food at Dave's Bistro" width="350" height="350">
				<img src="food2.jpg" alt="more food at Dave's Bistro" width="350" height="350">
			</div>
		</div>
		);
	}
};

ReactDOM.render(<HomePage />,document.getElementById('root'));