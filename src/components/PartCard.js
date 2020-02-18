import React from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { Block } from 'galio-framework';
import {theme} from "../constants";
import Text from '../components/Text'

const { width } = Dimensions.get('screen');

class PartCard extends React.Component {

  render() {
    const { part, selected } = this.props;
    const style = [styles.card, selected ? styles.selected: styles.baseCard];

    return (
      <Block center space="between" style={style}>
        <Block style={styles.imageWrap}>
          <Image
            style={styles.img}
            source={part.image} />
        </Block>
        <Text style={styles.text}>{part.name}</Text>
      </Block>
    );
  }
}

export default withNavigation(PartCard);

const styles = StyleSheet.create({
  imageWrap: {
    height: 60,
    alignSelf: 'stretch',
  },
  card: {
    width: (width / 2) - 40,
    height: 88,
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: theme.SIZES.BASE,
    borderRadius: 5,
    backgroundColor: theme.COLORS.CARD_BG,
  },
  baseCard: {
    borderColor: theme.COLORS.CARD_BG,
    paddingTop: 2,
  },
  selected: {
    borderWidth: 3,
    borderColor: theme.COLORS.PRIMARY,
    paddingTop: 0
  },
  text: {
    color: theme.COLORS.TEXT,
    marginBottom: 3
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 5,
    borderRadius: 5,
    resizeMode: 'cover'
  }
});
