import React from 'react';
import {Link} from 'react-router-dom';
import './header.css'

const Section = (props) => {
  return (
    <Link key={props.name} to={props.link} className={props.className}>
      <div>{props.name}</div>
    </Link>
  )
}

export default Section;
