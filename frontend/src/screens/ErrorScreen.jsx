import React from 'react';
import './ErrorPage.css'; // Import your custom CSS for styling

// Import images and animation libraries if needed

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-headline">Something went wrong try logging in Again!</h1>
      <img src="https://i.pinimg.com/originals/c5/13/0a/c5130ae703ad4b0f98c3a4863ca55ab8.gif" alt="Confused robot" className="error-image" />

    </div>
  );
};

export default ErrorPage;
