import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Block } from 'galio-framework';
import theme from '../constants/Theme'
import Wrap from '../components/Wrap'
import PartCard from "../components/PartCard";
import { Button, Text } from '../components'
import PARTS from '../constants/Parts'

class Parts extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      selectedParts: [],
    }
  }

  partPressHandler = ({id}) => {
    const {selectedParts} = this.state;
    if (selectedParts.includes(id)) {
      let arr = selectedParts.filter(el => el !== id);
      this.setState({
        selectedParts: arr
      })
    } else {
      this.setState({
        selectedParts: [...selectedParts, id]
      })
    }
  };

  renderParts = () => {
    const {selectedParts} = this.state;

    const parts = PARTS.map(p => {
      return (
        <TouchableOpacity onPress={() => this.partPressHandler(p)} key={`part-${p.id}`}>
          <PartCard selected={selectedParts.includes(p.id)} part={p} />
        </TouchableOpacity>
      );
    });
    return (
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block row flex space="around" style={styles.container}>
            {parts}
          </Block>
        </ScrollView>
      </Block>
    );
  };

  render() {
    const {navigation, path} = this.props;

    const {selectedParts} = this.state;

    return (
      <Wrap space="between" flex style={styles.wrap}>
        {this.renderParts()}
        {
          selectedParts.length > 0 ? (
            <Button
              style={styles.button}
              onPress={() => navigation.navigate(path, {parts: selectedParts})}
              uppercase
              color={theme.COLORS.PRIMARY}>
              Show workouts
            </Button>
          ) : null
        }
      </Wrap>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
  },
  wrap: {
    paddingTop: theme.SIZES.BASE
  },
  button: {
    fontWeight: 'bold',
    marginBottom: theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE
  },
});


export default Parts
