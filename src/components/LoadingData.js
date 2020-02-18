import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { LINKS, theme } from '../constants'
import { setUser } from '../actions/user'
import { getStyles } from '../actions/styles'
import { getExercises } from '../actions/exercises';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Block} from "galio-framework";
import {Text} from "./index";
import {$get, $post} from "../utils/Fetch";
import AsyncStorage from "@react-native-community/async-storage";


class LoadingData extends React.Component {
  state = {
    isLogged: false,
    isProfileLoaded: false,
    isStylesLoaded: false,
    isExercisesLoaded: false,
  };

  load = async () => {
    this.setState({isLogged: true});
    const profile = await $get(LINKS.PROFILE);
    this.props.setUser(profile.data);
    this.setState({isProfileLoaded: true});
    const styles = await $get(LINKS.STYLE);
    const s = styles || [];
    this.props.getStyles(s);
    this.setState({isStylesLoaded: true});
    const exercises = await $get(LINKS.EXERCISES);
    this.props.getExercises(exercises);
    this.setState({isExercisesLoaded: true});
  };

  async componentDidMount() {
    const { url, form, onSuccess, onError, checkAuth } = this.props;
    if (checkAuth) {
      const logged = await AsyncStorage.getItem('token');
      if (logged) {
        try {
          await this.load();
          onSuccess()
        } catch (e) {
          alert(e.message)
        }
      } else {
        onError();
      }
    } else {
      try {
        const login = await $post(url, { body: form });
        if (login.token) {
          await AsyncStorage.setItem('token', login.token);
          await this.load();
          onSuccess()
        } else {
          onError()
        }
      } catch (e) {
        alert(e.message)
      }
    }
  }

  render () {
    const {
      isLogged,
      isProfileLoaded,
      isStylesLoaded,
      isExercisesLoaded,
    } = this.state;

    return (
      <Block middle center flex style={styles.container}>
        <Block row space="between" style={styles.loadRow}>
          <Text style={styles.loadText}>Logging in</Text>
          {isLogged ? <Icon name="check" style={styles.icon} /> : <ActivityIndicator/>}
        </Block>
        <Block row space="between" style={styles.loadRow}>
          <Text style={styles.loadText}>Fetching Library</Text>
          {isProfileLoaded ? <Icon name="check" style={styles.icon} /> : <ActivityIndicator/>}
        </Block>
        <Block row space="between" style={styles.loadRow}>
          <Text style={styles.loadText}>Building</Text>
          {isStylesLoaded ? <Icon name="check" style={styles.icon} /> : <ActivityIndicator/>}
        </Block>
        <Block row space="between" style={styles.loadRow}>
          <Text style={styles.loadText}>Starting</Text>
          {isExercisesLoaded ? <Icon name="check" style={styles.icon} /> : <ActivityIndicator/>}
        </Block>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.APP_BG,
    alignItems: 'stretch'
  },
  loadText: {
    fontSize: 20,
    marginRight: 10
  },
  icon: {
    fontSize: 30,
    color: theme.COLORS.SUCCESS
  },
  loadRow: {
    width: 300
  },
});

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    getStyles: (styles) => dispatch(getStyles(styles)),
    getExercises: (exercises) => dispatch(getExercises(exercises)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingData)
