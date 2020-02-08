import React from 'react';
import './arcadeUser.css';

const UserLength = 3;

// function CreateUser(onChange, index) {
//   var className = "middle"
//   if (index = 0) {
//     className = "first"
//   } else if (index == UserLength - 1) {
//     className = "last"
//   }
//   return (
//     <input name={index} className={className} onChange={onChange} maxLength="1" />
//   );
// }

// class arcadeUser extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       focus: 0,
//     }
//   }

//   onChange(e) {
//     this.props.loginFormChange(e.target.name, e.target.value)
//     let ele = e.currentTarget.nextElementSibling
//     if (e.target.name != "last") {
//       ele.focus()
//     } else {
//       this.props.login()
//     }
//   }

//   render() {
//     // let userInput = [];
//     // for (let i = 0; i < UserLength; i++){
//     //   userInput.push(CreateUser(onChange, i));
//     // }
//     return (
//       <div>
//         <input autoFocus name={1} className="first" onChange={this.onChange} maxLength="1" />
//         <input name={2} className="middle" onChange={this.onChange} maxLength="1" />
//         <input name={3} className="last" onChange={this.onChange} maxLength="1" />
//       </div>
//     )
//   }
// }

const onChange = (e, props) => {
  props.loginFormChange(e.target.name, e.target.value)
  let ele = e.currentTarget.nextElementSibling
  if (e.target.name != "last") {
    ele.focus()
  } else {
    props.login()
  }
}

const ArcadeUser = props => {
  return (
    <div>
      <input autoFocus name="first" className="first" onChange={e => onChange(e, props)} maxLength="1" />
      <input name="middle" className="middle" onChange={e => onChange(e, props)} maxLength="1" />
      <input name="last" className="last" onChange={e => onChange(e, props)} maxLength="1" />
    </div>
  )
}
export default ArcadeUser;
