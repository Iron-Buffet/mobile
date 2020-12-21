import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Picker,
} from 'react-native';
import {Block} from 'galio-framework';
import {Checkbox, Input, Text, MultipleButtons} from '../index';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import theme from '../../constants/Theme';
import mealTypes from '../../utils/mealTypes';

const AdditionalInfo = ({
                          state,
                          setGender,
                          setGeneralUnits,
                          setEnergyUnits,
                          setDateFormat,
                          setWeight,
                          setHeight,
                          setLactation,
                          setBMRCalcMethod,
                          setRMRValue,
                          setBMR,
                          setBodyType,
                          setProfession,
                          setWeightGoals,
                          setGoalWeight,
                          setGoalRate,
                          setExpirationDate,
                          setMealTypeId,
                        }) => {

  const {height} = Dimensions.get('screen');

  const [datePicker, setDatePicker] = React.useState(false);
  const handleConfirm = date => {
    setExpirationDate(date);
    setDatePicker(false);
  };

  const handleDecrease = () => {
    if (state.generalUnits === 0) {
      if (state.goalRate > .25) {
        setGoalRate(state.goalRate - .25)
      }
    } else {
      if (state.goalRate > .11) {
        setGoalRate(state.goalRate - .11)
      }
    }
  };
  const handleIncrease = () => {
    if (state.generalUnits === 0) {
      if (state.goalRate < 2) {
        setGoalRate(state.goalRate + .25)
      }
    } else {
      if (state.goalRate < .88) {
        setGoalRate(state.goalRate + .11)
      }
    }
  };

  return (
    <Block style={{height: height - 220}}>
      <ScrollView>

        <Block center style={{paddingTop: 20}}>
          <Text title>Nutrition options</Text>
        </Block>
       <Text subtitle>General Units</Text>
        <Block row style={styles.mb16}>
          <Block style={styles.mr16}>
            <Checkbox
              onPress={() => setGeneralUnits(0)}
              value={state.generalUnits === 0}
              text='US'
            />
          </Block>
          <Checkbox
            onPress={() => setGeneralUnits(1)}
            value={state.generalUnits === 1}
            text='International'
          />
        </Block>
        {/*<Text subtitle>Energy Units</Text>
        <Block row style={styles.mb16}>
          <Block style={styles.mr16}>
            <Checkbox
              onPress={() => setEnergyUnits(0)}
              value={state.energyUnits === 0}
              text='US'
            />
          </Block>
          <Checkbox
            onPress={() => setEnergyUnits(1)}
            value={state.energyUnits === 1}
            text='International'
          />
        </Block>
        <Text subtitle>Date Format</Text>
        <Block row style={styles.mb16}>
          <Block style={styles.mr16}>
            <Checkbox
              onPress={() => setDateFormat(0)}
              value={state.dateFormat === 0}
              text='US'
            />
          </Block>
          <Checkbox
            onPress={() => setDateFormat(1)}
            value={state.dateFormat === 1}
            text='International'
          />
        </Block>
        <Text subtitle>Gender</Text>
        <Block row style={styles.mb16}>
          <Block style={styles.mr16}>
            <Checkbox
              onPress={() => setGender(0)}
              value={state.gender === 0}
              text='Male'
            />
          </Block>
          <Checkbox
            onPress={() => setGender(1)}
            value={state.gender === 1}
            text='Female'
          />
        </Block>
        <Block row space={`between`}>
          <Block>
            <Input
              placeholder="Weight"
              value={state.weight}
              style={{width: 135}}
              keyboardType="number-pad"
              onChangeText={text => {
                const weight = text.replace(/[^0-9]/g, '');
                setWeight(weight);
              }}
            />
          </Block>
          <Block>
            <Input
              placeholder="Height"
              value={state.height}
              style={{width: 135}}
              keyboardType="number-pad"
              onChangeText={text => {
                const height = text.replace(/[^0-9]/g, '');
                setHeight(height);
              }}
            />
          </Block>
        </Block>
        {state.gender === 1 && (<Block>
            <Text subtitle>Lactation</Text>
            <Block row style={styles.mb16}>
              <Block style={styles.mr16}>
                <Checkbox
                  onPress={() => setLactation(0)}
                  value={state.lactation === 0}
                  text='No'
                />
              </Block>
              <Checkbox
                onPress={() => setLactation(1)}
                value={state.lactation === 1}
                text='Yes'
              />
            </Block>
          </Block>)}
        <Text subtitle>BMRCalcMethod</Text>
        <Block row style={styles.mb16}>
          <Block style={styles.mr16}>
            <Checkbox
              onPress={() => setBMRCalcMethod(0)}
              value={state.BMRCalcMethod === 0}
              text='Default Calculation'
            />
          </Block>
          <Block style={styles.mr16}>
            <Checkbox
              onPress={() => setBMRCalcMethod(1)}
              value={state.BMRCalcMethod === 1}
              text='RMR Device'
            />
          </Block>
          <Checkbox
            onPress={() => setBMRCalcMethod(2)}
            value={state.BMRCalcMethod === 2}
            text='Custom'
          />
        </Block>
        {state.BMRCalcMethod === 1 && (
            <Block>
              <Text subtitle>RMRValue</Text>
              <Input
                placeholder="RMR Value"
                value={state.RMRValue}
                keyboardType={'number-pad'}
                onChangeText={setRMRValue}
              />
            </Block>
          )}
        {state.BMRCalcMethod === 2 && (
            <Block>
              <Text subtitle>BMR</Text>
              <Input
                placeholder="BMR"
                value={state.BMR}
                keyboardType={'number-pad'}
                onChangeText={setBMR}
              />
            </Block>
          )}
        <Text subtitle>Body type</Text>
        <Block row style={styles.mb16}>
          <Block style={styles.mr16}>
            <Checkbox
              onPress={() => setBodyType(0)}
              value={state.bodyType === 0}
              text='Type I'
            />
          </Block>
          <Block style={styles.mr16}>
            <Checkbox
              onPress={() => setBodyType(1)}
              value={state.bodyType === 1}
              text='Type II'
            />
          </Block>
          <Checkbox
            onPress={() => setBodyType(2)}
            value={state.bodyType === 2}
            text='Type III'
          />
        </Block>
        <Text subtitle>Profession</Text>
        <Block row style={[styles.mb16, styles.twoRows]}>
          <Block style={styles.mr16}>
            <Checkbox
              onPress={() => setProfession(0)}
              value={state.profession === 0}
              text='Sedentary'
            />
          </Block>
          <Block style={styles.mr16}>
            <Checkbox
              onPress={() => setProfession(1)}
              value={state.profession === 1}
              text='Moderate'
            />
          </Block>
          <Checkbox
            onPress={() => setProfession(2)}
            value={state.profession === 2}
            text='Active'
          />
          <Block style={styles.mt8}>
            <Checkbox
              onPress={() => setProfession(3)}
              value={state.profession === 3}
              text='Very Active'
            />
          </Block>
        </Block>
        <Text subtitle>Weight Goals</Text>
        <Block row style={[styles.mb16, styles.twoRows]}>
          <Block style={styles.mr16}>
            <Checkbox
              onPress={() => setWeightGoals(0)}
              value={state.weightGoals === 0}
              text='Weight Loss'
            />
          </Block>
          <Block style={styles.mr16}>
            <Checkbox
              onPress={() => setWeightGoals(1)}
              value={state.weightGoals === 1}
              text='Weight Maintain'
            />
          </Block>
          <Block style={styles.mt8}>
            <Checkbox
              onPress={() => setWeightGoals(2)}
              value={state.weightGoals === 2}
              text='Weight Gain'
            />
          </Block>
        </Block>
        {state.weightGoals === 1 && (
          <Block>
            <Input
              placeholder="Goal Weight"
              value={state.goalWeight}
              keyboardType="number-pad"
              onChangeText={text => {
                const val = text.replace(/[^0-9]/g, '');
                setGoalWeight(val);
              }}
            />
          </Block>
        )}
        {state.weightGoals === 1 && (
          <Block>
            <Text subtitle>Goal Rate</Text>
            <Block row space={'between'}>
              <Text>{state.goalRate}</Text>
              <MultipleButtons
                onDecrease={handleDecrease}
                onIncrease={handleIncrease}
              />
            </Block>
          </Block>
        )}
        <Text subtitle>Expiration Date</Text>
        <Block style={{position: 'relative'}}>
          <TouchableWithoutFeedback
            onPress={() => setDatePicker(true)}>
            <Block style={styles.inputOverflow}/>
          </TouchableWithoutFeedback>
          <Input
            placeholder="Expiration Date"
            editable={false}
            value={state.expirationDate.toLocaleDateString()}
          />
        </Block>
        <Block>
          <Text subtitle>Meal Type</Text>
          <Picker
            selectedValue={state.mealTypeId}
            style={{ height: 50 }}
            onValueChange={mealTypeId =>
              setMealTypeId(mealTypeId)
            }
          >
            {mealTypes.map(mt => {
              return (<Picker.Item key={mt.value} label={mt.label} value={mt.value} />)
            })}
          </Picker>
        </Block>*/}
      </ScrollView>
      <DateTimePickerModal
        isVisible={datePicker}
        mode="date"
        onConfirm={handleConfirm}
        isDarkModeEnabled={theme.IS_DARK}
        onCancel={() => setDatePicker(false)}
      />
    </Block>

  );
};

const styles = StyleSheet.create({
  mb30: {
    marginBottom: 30,
  },
  mr16: {
    marginRight: 16,
  },
  mb16: {
    marginBottom: 16,
  },
  twoRows: {
    flexWrap: 'wrap'
  },
  mt8: {
    marginTop: 8,
  },
  inputOverflow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
});

export default AdditionalInfo;
