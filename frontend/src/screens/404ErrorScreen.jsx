import React from 'react';
import './ErrorPage.css'; // Import your custom CSS for styling

function NotFound() {
  return (
    <div className="not-found">
      <h1>Whoops!, we have a problem...</h1>
      <img src="https://i.pinimg.com/564x/9c/00/b8/9c00b8c1300d6589801add1f35e041e6.jpg" style={{ width: "500px", height: "300px", display: "block", margin: "0 auto" }} alt="Lost in space!" />
      <p>Looks like you've drifted off course!</p>
    
    </div>
  );
}

export default NotFound;