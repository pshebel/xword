import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  postWord,
  changeWord,
} from '../../redux/actions/words'

import Word from './component'

class WordContainer extends Component {
  render() {
    return (
      <div>
        <Word 
          words={this.props.words}
          postWord={this.props.postWord}
          changeWord={this.props.changeWord}
        />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    words: state.words,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    postWord: (word, definition, wordLen) => dispatch(postWord(word, definition, wordLen)),
    changeWord: (name, value) => dispatch(changeWord(name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordContainer);