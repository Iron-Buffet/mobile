import React from 'react';
import { StyleSheet, Dimensions, ScrollView,  ImageBackground, Platform, ActivityIndicator} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { Block } from 'galio-framework';
import { Text, Button } from '../components'
import {$get, $post} from "../utils/Fetch";
import DateTimePicker from '@react-native-community/datetimepicker';

import {  theme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import PARTS from '../constants/Parts'
import { connect } from 'react-redux'
import {setUser} from "../actions/user";
import {getStyles} from "../actions/styles";
import {getExercises} from "../actions/exercises";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
const widthArr = [150, 100, 50, 50, 150];

class Workout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      workout: {},
      exercises: [],
      tableHead: ['Exercise', 'Style', 'Sets', 'Reps', 'Notes'],
      isModalVisible: false,
      date: new Date(),
      timestamp: Math.floor(Date.now() / 1000),
      image: null,
    }
  }

  setDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      date,
      timestamp: Date.parse(date) / 1000
    });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  addPressHandler = () => {
    const { workout, timestamp } = this.state;
    const {navigation} = this.props;
    const data = new FormData();
    data.append('id', workout.id);
    data.append('date', timestamp);
    $post('/workout/set-date', { body: data }).then(() => {
      navigation.push('Calendar')
    })
  };



  componentDidMount(){
    const {navigation} = this.props;
    const id = navigation.getParam('id');
    return $get('/workout/view?id=' + id)
      .then((workout) => {
        const exercises = workout.parts.reduce((arr, el) => {
          if (el.exercises) {
            return arr.concat(el.exercises)
          }
          return arr
        }, []);
        const image = PARTS.find(p => p.id === workout.parts[0].id).image;
        this.setState({
          isLoading: false,
          workout,
          exercises,
          image
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  renderRow = (data, idx) => {
    const { fitStyles } = this.props;
    const style = fitStyles.find(s => s.id === data.style);
    const styleName = style ? style.name : '';
    const exName = data.baseExercise ? data.baseExercise.name : '';
    const rowData = [exName, styleName, data.sets, data.reps, data.notes];
    const border = idx === this.state.exercises.length - 1 ? {borderBottomWidth: 0} : null;
    return (
      <Row
        style={[styles.row, border]}
        textStyle={styles.rowText}
        data={rowData}
        widthArr={widthArr}
        key={rowData[0] + '' + idx} />
    )
  };

  render() {
    const {isLoading, workout, exercises, image} = this.state;
    const state = this.state;
    if(isLoading){
      return(
        <Block flex style={{paddingTop: 20, ...styles.home}}>
          <ActivityIndicator/>
        </Block>
      )
    }
    return (
      <Block flex style={styles.home}>
        <Block>
          <ImageBackground
            source={image}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              this.state.isModalVisible  ?
                (
                  <Block flex>
                    <Text title>Select Date</Text>
                    <DateTimePicker
                      style={styles.date}
                      value={this.state.date}
                      mode="datetime"
                      is24Hour={false}
                      onChange={this.setDate} />
                      <Block row space="between" style={{marginTop: 16}}>
                        <Button
                          small
                          back
                          style={styles.btn}
                          onPress={() => this.toggleModal()}>
                          Back
                        </Button>
                        <Button
                            small
                            onPress={this.addPressHandler}
                            style={styles.btn}>
                          ADD
                        </Button>
                      </Block>
                  </Block>
                ) : (
                  <Block flex>
                    <Block flex style={{ marginBottom: 12 }}>
                      <Block style={styles.profileTexts}>
                        <Text color="white" size={28}>{workout.name}</Text>
                        <Text style={styles.seller}>Difficulty {workout.rating}</Text>
                      </Block>
                      <ScrollView horizontal={true}>
                        <Table>
                          <Row widthArr={widthArr} data={state.tableHead} style={styles.row} textStyle={styles.rowText}/>
                          {
                            exercises.map((ex, idx) => {
                              return this.renderRow(ex, idx)
                            })
                          }
                        </Table>
                      </ScrollView>
                    </Block>
                    <Text style={{marginBottom: 8, fontWeight: 'bold'}} color="white" bold size={20}>Description</Text>
                    <Text color="white">{workout.description}</Text>
                  </Block>
                )
            }
          </ScrollView>
          {
            !this.state.isModalVisible ? (
              <Button
                onPress={this.toggleModal}
                style={styles.buttonBig}
              >
                Add to Calendar
              </Button>
            ) : null
          }
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    flex: 1,
    backgroundColor: theme.COLORS.APP_BG,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  btn: {
    width: 80,
    shadowColor: 'transparent',
  },
  buttonBig: {
    width: 'auto',
    marginTop: 'auto',
  },
  rowText: {
    color: theme.COLORS.TEXT,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    fontSize: 16
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.TEXT,
    paddingVertical: theme.SIZES.BASE / 2
  },
  profileImage: {
    width: null,
    height: null,
    flex: 1,
  },
  exercise: {
    paddingVertical: theme.SIZES.BASE,
    borderTopColor: theme.COLORS.MUTED,
    borderTopWidth: 1
  },
  profileContainer: {
    width: width,
    height: height / 4,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    paddingBottom: 30,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingBottom: theme.SIZES.BASE,
    zIndex: 2
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    paddingBottom: 60,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -40,
    marginBottom: -30,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    shadowColor: theme.COLORS.SHADOW,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 3,
    zIndex: 2,
    backgroundColor: theme.COLORS.CARD_BG
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  buttonWrap: {
    paddingBottom: 30,
    marginHorizontal: theme.SIZES.BASE
  },
  date: {
    zIndex: 30,
    color: theme.COLORS.TEXT,
    position: 'relative',
  },
});
const mapStateToProps = state => {
  return {
    fitStyles: state.stylesReducer.styles
  }
};

export default connect(mapStateToProps)(Workout)
