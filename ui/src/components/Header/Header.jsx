import React from 'react';
import Section from './section';
import './header.css';

const links = [
  {
    link: "/xword/play",
    name: "play"
  },
  {
    link: "/xword/leaderboard",
    name: "leaderboard"
  },
  {
    link: "/xword/word",
    name: "word"
  }
]

const Header = () => {
  return (
    <div className="header">
      {links.map((ele, i) => {
        if (i === links.length-1) {
          return (
            <Section key={ele.name} name={ele.name} link={ele.link} className={"section last"}/>
          )
        } else {
          return (
            <Section key={ele.name} name={ele.name} link={ele.link} className={"section"}/>
          )
        }
      })}
    </div>
  )
}

export default Header;
