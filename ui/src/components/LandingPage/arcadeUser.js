import React from 'react';
import './arcadeUser.css';

const UserLength = 3;

const onKeyDown = (e, props) => {
  if(e.key === "Backspace") {
    if (e.target.value === "") {
      // if the element is empty and the user hits backspace again
      // go to the previous element
      let ele = e.currentTarget.previousElementSibling
      ele.focus()
    } else {
      // since we aren't doing onChange, manually set empty string
      // on backspace
      props.loginFormChange(e.target.name, "")
    }
  } else {
    props.loginFormChange(e.target.name, e.key)
    if (e.target.name != "last") {
      let ele = e.currentTarget.nextElementSibling
      ele.focus()
    } 
    // else if (props.user === "") {
    //   props.login()
    // }
  }
}

const check = (props) => {
  if (props.user !== "") {
    props.login()
  }
}

const ArcadeUser = props => {
  return (
    <div>
      {check(props)}
      <input
        autoFocus
        name="first"
        className="user first"
        onKeyDown={e => onKeyDown(e, props)}
        value={props.input.first}
        maxLength="1"
      />
      <input
        name="middle"
        className="user middle"
        onKeyDown={e => onKeyDown(e, props)}
        value={props.input.middle}
        maxLength="1"
      />
      <input
        name="last"
        className="user last"
        onKeyDown={e => onKeyDown(e, props)}
        value={props.input.last}
        maxLength="1"
      />
    </div>
  )
}
export default ArcadeUser;
