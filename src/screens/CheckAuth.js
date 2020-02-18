import React from 'react';
import { Wrap } from '../components'
import { connect } from 'react-redux'
import LoadingData from '../components/LoadingData'

import { setUser } from "../actions/user";
import { getStyles } from "../actions/styles";
import { getExercises } from "../actions/exercises";

class CheckAuth extends React.Component {

  render() {
    const { navigation, user } = this.props;
    console.log(user)
    return (
      <Wrap>
        <LoadingData
          checkAuth
          onSuccess={
            () => navigation.navigate(user.status === 0 ? 'Alert' : 'Dashboard')
          }
          onError={
            () => navigation.navigate('Login')
          }/>
      </Wrap>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    styles: state.stylesReducer.styles
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    getStyles: (styles) => dispatch(getStyles(styles)),
    getExercises: (exercises) => dispatch(getExercises(exercises)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckAuth)
