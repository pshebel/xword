import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// set random background images
// document.body.style.backgroundImage = `url(../assets/images/backgrounds/bg-${Math.floor(Math.random() * 6)}.png)`

document.body.style.backgroundImage = `url(https://xword-backgrounds.s3.amazonaws.com/bg-${Math.floor(Math.random() * 6)}.png)`

ReactDOM.render(<App />, document.getElementById('root'));
