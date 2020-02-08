import React, { Component } from 'react'
import { connect } from 'react-redux'
import Xword from './component'

class XwordContainer extends Component {
 render() {
   return (
     <Xword
     />
   )
 } 
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    xword: state.xword,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(XwordContainer);