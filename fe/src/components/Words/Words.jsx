import React from 'react';

class Words extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      word: '',
      definition: ''
    }
  }

  submit = () => {
    this.props.postWord(this.state)
  }

  render() {
    return (
      <div>
        <h1>Add a Word</h1>
        <h4>Word</h4>
        <input type="text" onChange={(e) => this.setState({word: e.target.value})} />

        <h4>Definition</h4>
        <textarea onChange={(e) => this.setState({definition: e.target.value})}/>
        <input type="button" onClick={this.submit} value="Submit"/>

      </div>
    )
  }
}

export default Words;
