import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Block} from 'galio-framework';
import {Text, Wrap} from '../components';

import {theme} from '../constants';
import PARTS from '../constants/Parts';
import {HeaderHeight} from '../constants/utils';
import {AuthContext} from '../context/contexts';
const {width, height} = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

const Profile = ({navigation}) => {
  const {user, fbUser} = React.useContext(AuthContext);

  return (
    !!user && (
      <Wrap style={styles.profile}>
        <Block>
          <ImageBackground
            source={{uri: fbUser.avatar || 'https://wallpaperaccess.com/full/834264.jpg'}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex style={styles.profileDetails} />
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text color={theme.COLORS.TEXT} size={28} style={{paddingBottom: 8}}>
              {user.name}
            </Text>
            <Block row space="between" style={{padding: theme.SIZES.BASE}}>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>
                  {user.workouts.all}
                </Text>
                <Text muted size={12}>
                  WORKOUTS
                </Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>
                  {user.workouts.todo}
                </Text>
                <Text muted size={12}>
                  TODO
                </Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>
                  {user.workouts.done}
                </Text>
                <Text muted size={12}>
                  DONE
                </Text>
              </Block>
            </Block>
            <Block
              row
              space="between"
              style={{paddingVertical: 16, alignItems: 'baseline'}}>
              <Text size={16}>Recently Viewed Workouts</Text>
              <Text
                size={12}
                color={theme.COLORS.PRIMARY}
                onPress={() => navigation.navigate('WorkoutManagement')}>
                View All
              </Text>
            </Block>
            <Block style={{paddingBottom: HeaderHeight * 2}}>
              <Block row space="between" style={{flexWrap: 'wrap'}}>
                {user.workouts.recently.map(r => {
                  const image = PARTS.find(part => part.id === r.parts[0].id)
                    .image;
                  return (
                    <TouchableOpacity
                      key={`rec${r.id}`}
                      onPress={() =>
                        navigation.navigate('WMWorkout', {id: r.id})
                      }>
                      <Block style={styles.recently}>
                        <Image
                          resizeMode="cover"
                          source={image}
                          style={styles.thumb}
                        />
                        <Text style={styles.recentlyName}>
                          {r.name || 'Workout #' + r.id}
                        </Text>
                      </Block>
                    </TouchableOpacity>
                  );
                })}
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Wrap>
    )
  );
};

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 3,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 4,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.CARD_BG,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  recently: {
    marginBottom: theme.SIZES.BASE,
  },
  recentlyName: {
    textAlign: 'center',
    fontSize: 8,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
});

export default Profile;
