import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Block} from 'galio-framework';
import theme from '../constants/Theme';
import Wrap from '../components/Wrap';
import PartCard from '../components/PartCard';
import {Button} from '../components';
import PARTS from '../constants/Parts';
import {useNavigation} from '@react-navigation/native';

const Parts = props => {
  const {path} = props;

  const navigation = useNavigation();

  const [state, setState] = React.useState({
    isLoading: true,
    selectedParts: [],
  });

  const partPressHandler = ({id}) => {
    const {selectedParts} = state;
    if (selectedParts.includes(id)) {
      let arr = selectedParts.filter(el => el !== id);
      setState({
        ...state,
        selectedParts: arr,
      });
    } else {
      setState({
        ...state,
        selectedParts: [...selectedParts, id],
      });
    }
  };

  React.useEffect(() => {
    return () => {
      setState(prev => ({
        ...prev,
        selectedParts: [],
      }));
    }
  }, []);

  const renderParts = () => {
    const {selectedParts} = state;

    const parts = PARTS.map(p => {
      return (
        <TouchableOpacity
          onPress={() => partPressHandler(p)}
          key={`part-${p.id}`}>
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

  const {selectedParts} = state;

  return (
    <Wrap space="between" flex style={styles.wrap}>
      {renderParts()}
      {selectedParts.length > 0 ? (
        <Button
          style={styles.button}
          onPress={() => navigation.navigate(path, {parts: selectedParts})}
          uppercase
          color={theme.COLORS.PRIMARY}>
          Show workouts
        </Button>
      ) : null}
    </Wrap>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
  },
  wrap: {
    paddingTop: theme.SIZES.BASE,
  },
  button: {
    fontWeight: 'bold',
    marginBottom: theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
  },
});

export default Parts;
