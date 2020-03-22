import React from 'react';

class Words extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      word: '',
      definition: ''
    }
  }

  handleSubmit = () => {
    this.props.postWord(this.state, ((res) => {
      if (res === 200) {
        this.setState({ word: '', definition: ''})
        this.props.putUser("words", ((res) => {
          if (res === 200) {
            console.log("success inc word for user")
          } else {
            console.log("failed to inc word for user")
          }
        }))
      } else {
        console.log("failed to post word")
      }
    }))
  }

  render() {
    return (
      <div>
        <h1>Add a Word</h1>
        <h4>Word</h4>
        <input type="text" value={this.state.word} onChange={(e) => this.setState({word: e.target.value})} />

        <h4>Definition</h4>
        <textarea value={this.state.definition} onChange={(e) => this.setState({definition: e.target.value})}/>
        <input type="button" onClick={this.handleSubmit} value="Submit"/>
      </div>
    )
  }
}

export default Words;
