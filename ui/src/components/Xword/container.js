import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getXword,
  getCheckXword,
  xwordIndexChange,
  xwordElementChange,
  xwordDirectionChange,
} from '../../redux/actions/xword'

import Xword from './component'


class XwordContainer extends Component {
  componentDidMount() {
    if (this.props.xword.xword.id === "") {
      this.props.getXword()
    }
  }
  render() {
    return (
      <div>
        <Xword
          user={this.props.user}
          xword={this.props.xword}
          getXword={this.props.getXword}
          getCheckXword={this.props.getCheckXword}
          xwordElementChange={this.props.xwordElementChange}
          xwordIndexChange={this.props.xwordIndexChange}
          xwordDirectionChange={this.props.xwordDirectionChange}
        />
      </div>
    )
  } 
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    xword: state.xword,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getXword: () => dispatch(getXword()),
    xwordElementChange: (value) => dispatch(xwordElementChange(value)),
    xwordIndexChange: (id) => dispatch(xwordIndexChange(id)),
    xwordDirectionChange: (direction) => dispatch(xwordDirectionChange(direction)),
    getCheckXword: () => dispatch(getCheckXword()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(XwordContainer);