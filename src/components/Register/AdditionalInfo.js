import React from 'react';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Block} from 'galio-framework';
import {Checkbox, Input, Text} from '../index';

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
                        }) => {

  const {height} = Dimensions.get('screen');

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
        <Text subtitle>Energy Units</Text>
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
              onChangeText={text => {
                const height = text.replace(/[^0-9]/g, '');
                setHeight(height);
              }}
            />
          </Block>
        </Block>
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
      </ScrollView>
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
});

export default AdditionalInfo;
