import React from 'react'
import { connect } from 'react-redux';
import { testApp } from '../store/utils/thunkCreators';


function Test(props) {
  console.log(props)
  return (
    <div>Test</div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    testApp: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    testApp: () => {
      dispatch(testApp())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);