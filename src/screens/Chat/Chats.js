import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
} from 'react-native';
import {Block} from 'galio-framework';
import {theme} from '../../constants';
import Wrap from '../../components/Wrap';
import {Button, Text, KeyboardView} from '../../components';
const firebase = require('firebase');
require('firebase/firestore');
import {AuthContext} from '../../context/contexts';
import {fire} from '../../services';
import {useFocusEffect} from '@react-navigation/native';
import {
  getShortMonth, getUtcTimestamp,
} from '../../utils/methods';
import {SET_CHATS} from "../../context/types";
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  await messaging().requestPermission();
}


const Chats = ({navigation}) => {
  const {chats, dispatch, user} = React.useContext(AuthContext);
  const [popup, setPopup] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [chat, setChat] = React.useState('');

  const handleCreateTicket = () => {
    if (loading) {
      return false;
    }
    setLoading(true);
    fire.addChat({user_name: user.name, chat}).then(() => {
      setChat('');
      setLoading(false);
      setPopup(false);
      /*fire.updateChats().then(res =>{
        dispatch({type: SET_CHATS, chats: res})
      });*/
    })
  };

  const handleRefresh = async () => {
    setRefreshing(true);
   /* fire.updateChats().then(res =>{
      dispatch({type: SET_CHATS, chats: res})
    });*/
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      requestUserPermission();
      const unsubscribe = fire.firestore
        .collectionGroup('chats')
        .orderBy('created_at')
        .onSnapshot(res => {
          let _chats = [];
          res.forEach(doc => {
            const data = doc.data();
            const showChatsCondition = data.uid === fire.uid || (data.is_new && user.role === 'trainer') || data.trainer === fire.uid;
            if (showChatsCondition) {
              _chats = [{id: doc.id, ...doc.data()}, ..._chats]
            }
          });
          dispatch({type: SET_CHATS, chats: _chats});
        });
      return () => {
        unsubscribe();
      }
      /*fire.updateChats().then(res =>{
        dispatch({type: SET_CHATS, chats: res})
      });
      return () => {
      }*/
    }, []),
  []);

  const renderItem = message => {
    const date = new Date(message.created_at);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Messages', {
            isFree: !message.trainer,
            id: message.id,
            title: message.chat,
            author: message.uid,
          });
        }}>
        <Block flex style={styles.item}>
          <Block style={{alignItems: 'flex-start'}} flex row space={'between'}>
            <Text size={16} bold={message.is_new}>
              {message.chat}
            </Text>
            {message.new_messages && message.last_message_from !== fire.uid && (
              <Block style={styles.new}>
                <Text color={'white'}>
                  {message.new_count}
                </Text>
              </Block>
            )}
          </Block>
          <Block row space={`between`} style={styles.opacity}>
            <Text>
              {message.user_name}
            </Text>
            <Text muted>
              {getShortMonth()[date.getMonth()]} {date.getDate()}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  };

  return (
    <Wrap>
      <KeyboardView>
        <Block flex>
          <FlatList
            data={chats}
            keyExtractor={item => {
              return item.created_at.toString();
            }}
            renderItem={({item}) => renderItem(item)}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={theme.COLORS.TEXT}
              />
            }
          />
        </Block>
        {user.role !== 'trainer' && (
          <Block style={{position: 'relative'}}>
            {popup && (
              <Block style={styles.window}>
                <Text size={18}>Ask a question</Text>
                <TextInput
                  multiline={true}
                  value={chat}
                  placeholder="Type a message"
                  placeholderTextColor={theme.COLORS.TEXT}
                  onChangeText={text => setChat(text)}
                  style={styles.input}
                />
                <Button onPress={handleCreateTicket} style={styles.send} small>
                  Send
                </Button>
              </Block>
            )}
            <Button
              onPress={() => {
                setPopup(!popup);
              }}
              style={styles.addTicket}>
              Need Help?
            </Button>
          </Block>
        )}
      </KeyboardView>
    </Wrap>
  );
};

const styles = StyleSheet.create({
  send: {
    marginTop: 10,
  },
  window: {
    padding: 10,
    borderWidth: 1,
    width: 'auto',
    height: 200,
    borderColor: theme.COLORS.BORDER_COLOR,
    marginBottom: 10,
    marginHorizontal: theme.SIZES.BASE,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.COLORS.BORDER_COLOR,
    marginTop: 10,
    padding: 5,
    height: 100,
    color: theme.COLORS.TEXT,
  },
  addTicket: {
    marginBottom: 20,
    marginHorizontal: theme.SIZES.BASE,
  },
  item: {
    borderBottomColor: theme.COLORS.BORDER_COLOR,
    borderBottomWidth: 1,
    padding: theme.SIZES.BASE / 2,
  },
  opacity: {
    opacity: 0.5,
  },
  new: {
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: theme.COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default Chats;
