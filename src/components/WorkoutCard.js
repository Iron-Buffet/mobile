import React from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block } from 'galio-framework';
import Text from '../components/Text';
import PARTS from '../constants/Parts';
import {theme} from '../constants'

const { width } = Dimensions.get('screen');

class WorkoutCard extends React.Component {
  render() {
    const { navigation, workout, horizontal, full, style, priceColor, imageStyle, workoutPath } = this.props;
    const image = PARTS.find(p => p.id === workout.exercises[0].part_id).image;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    return (
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate(workoutPath, { id:workout.id })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={image} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate(workoutPath, { id:workout.id })}>
          <Block flex space="between" style={styles.productDescription}>
            <Text style={styles.productTitle}>{workout.name || 'Workout #' + workout.id}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

export default withNavigation(WorkoutCard);

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.CARD_BG,
    marginBottom: theme.SIZES.BASE * 1.25,
    borderWidth: 0,
    minHeight: 114,
    borderRadius: 4,
    marginHorizontal: 7
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    color: theme.COLORS.TEXT,
    fontSize: 20
  },
  productDescription: {
    paddingHorizontal: theme.SIZES.BASE / 2,
    paddingVertical: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.SHADOW,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 3,
  },
});
