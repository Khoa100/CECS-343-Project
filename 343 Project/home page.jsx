var NewComponent = React.createClass({
  render: function() {
    return (
      <div>
        <title>Home Page</title>
        <link rel="stylesheet" text="text/css" href="bistro.css" />
        <img src="343photo.jpg" alt="dave's bistro" className="newim" />
        <nav>
          <ul>
            <li><a href="newReserv.html">New Reservation</a></li>
            <li><a href="viewReserv.html">View My Reservations</a></li>
            <li><a href="history.html">Reservation History</a></li>
            <li><a href="preferences.html">Account Preferences</a></li>
          </ul>
        </nav>
      </div>
    );
  }
});
