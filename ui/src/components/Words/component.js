import React from 'react';
import './words.css'

class Words extends React.Component {
  render() {
    return (
      <div className="words">
        <h1>Add a Word</h1>
        <div className="forms">
          <div className="col">
            <h4>Word</h4>
            <input type="text" name="word" value={this.props.words.word} onChange={(e) => this.props.changeWord(e.target.name, e.target.value)}/>
            <h4>Definition</h4>
            <textarea name="definition" value={this.props.words.definition} onChange={(e) => this.props.changeWord(e.target.name, e.target.value)}/>
          </div>
          <p>
            {this.props.words.success && <div>Successfully added word</div>}
            {this.props.words.error && 
              <div>Error: {this.props.words.error}</div>
            }
          </p>
          <button 
            disabled={this.props.words.word == "" || this.props.words.definition == ""}
            onClick={() => this.props.postWord(this.props.words.word, this.props.words.definition, this.props.words.word.length)} 
          >
            Submit
          </button>
          
        </div>
      </div>
    )
  }
}

export default Words;