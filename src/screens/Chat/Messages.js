import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  View,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {Block} from 'galio-framework';
import {theme} from '../../constants';
import {Text, KeyboardView, Message, Wrap} from '../../components';
import {AuthContext} from '../../context/contexts';
import {useFocusEffect} from '@react-navigation/native';
import {getUtcTimestamp} from '../../utils/methods';
import {fire} from '../../services';
import {SET_CURRENT_CHAT} from "../../context/types";
import * as firebase from 'firebase';

const Messages = ({route, navigation}) => {
  const {fbUser, user, dispatch} = React.useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [rightAvatar, setRightAvatar] = useState('');
  const [ownAvatar, setOwnAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState('');
  const {id, title, isFree, author} = route.params;
  let screenTitle = title;
  if (title.length > 20) {
    screenTitle = title.substr(0, 20) + '...';
  }
  navigation.setOptions({
    title: screenTitle,
  });

  const chatRef = fire.firestore.collection('users').doc(author).collection('chats').doc(id);

  useFocusEffect(
    React.useCallback(() => {
      let chatSub = () => {};

      chatRef.get().then(res => {
        if (!res.data().trainer) {
          chatSub = chatRef.onSnapshot(snap => {
            const data = snap.data();
            if (data.trainer) {
              const neededUid = data.trainer === fire.uid ? data.uid : data.trainer;
              fire.firestore.collection('users').doc(neededUid).get().then(n => {
                setRightAvatar(n.data().avatar)
              })
            }
          });
        } else {
          const neededUid = res.data().trainer === fire.uid ? res.data().uid : res.data().trainer;
          fire.firestore.collection('users').doc(neededUid).get().then(n => {
            setRightAvatar(n.data().avatar)
          })
        }
      });
      setOwnAvatar(fbUser.avatar || user.avatar);
      setMessageList([]);
      dispatch({type: SET_CURRENT_CHAT, chat: id});
      if (fire.uid !== author) {
        if (isFree) {
          Alert.alert(
            'Join this chat',
            null,
            [
              {
                text: 'Cancel',
                onPress: () => navigation.goBack(),
                style: 'cancel',
              },
              {text: 'Yes', onPress: () => acceptChat()},
            ],
            {cancelable: false},
          );
        }
      }

      const onSub = chatRef.collection('messages').orderBy('created_at').onSnapshot(
        res => {
          let _messages = [];
          res.forEach(doc => {
            _messages = [doc.data(), ..._messages]
          });
          setMessageList(_messages)
        }
      );
      chatRef.get().then(async snap => {
        const data = snap.data();
        if (data.new_messages && data.last_message_from !== fire.uid) {
          await chatRef.update({new_messages: false, new_count: 0})
        }
      });
      chatRef.update({
        online: firebase.firestore.FieldValue.arrayUnion(fire.uid)
      });

      return () => {
        dispatch({type: SET_CURRENT_CHAT, chat: null});
        console.log('set');
        onSub();
        chatSub();
        chatRef.update({
          online: firebase.firestore.FieldValue.arrayRemove(fire.uid)
        });
      };
      //eslint-disable-next-line
    }, [id]),
    //eslint-disable-next-line
    [],
  );

  const handleSend = () => {
    const msg = message.trim();
    if (msg === '' || loading) {
      return false;
    }
    setMessage('');
    setLoading(true);
    chatRef.collection('messages').add({
      message: msg,
      user_id: fire.uid,
      created_at: getUtcTimestamp(),
      user_name: user.name,
    })
      .then(async () => {
        chatRef.get().then(snap => {
          const data = snap.data();
          chatRef.update({
            new_messages: data.online.length < 2,
            last_message_from: fire.uid,
            last_message: msg,
            last_message_name: user.name,
            new_count: data.online.length < 2 ? firebase.firestore.FieldValue.increment(1) : 0,
          })
            .then(() => {
              setLoading(false);
            })
        });
      });
  };

  const acceptChat = async () => {
    chatRef.get().then(async res => {
      if (res.data().trainer) {
        Alert.alert(
          'Someone else joined this chat.',
          null,
          [
            {
              text: 'Cancel',
              onPress: () => navigation.goBack(),
              style: 'OK',
            },
          ],
          {cancelable: false},
        );
      } else {
        await chatRef.update({
          trainer: fire.uid,
          is_new: false,
          users: firebase.firestore.FieldValue.arrayUnion(fire.uid),
        });
      }
    })
  };

  return (
    <Wrap>
      <KeyboardView flex>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            inverted
            data={messageList}
            keyExtractor={item => {
              return item.created_at.toString();
            }}
            renderItem={({item}) => {
              const side = item.user_id === fbUser.uid ? 'right' : 'left';
              return <View onStartShouldSetResponder={() => true}>
                <Message
                  ownAvatar={ownAvatar}
                  rightAvatar={rightAvatar}
                  side={side}
                  item={item} />
              </View>;
            }}
          />
          <Block style={styles.inputWrap}>
            <TextInput
              placeholder="Type your message"
              style={styles.input}
              multiline={true}
              value={message}
              placeholderTextColor={theme.COLORS.TEXT}
              onChangeText={message => setMessage(message)}
            />
            <TouchableOpacity onPress={handleSend}>
              <Block center middle style={styles.send}>
                <Text color="white">SEND</Text>
              </Block>
            </TouchableOpacity>
          </Block>
        </SafeAreaView>
      </KeyboardView>
    </Wrap>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 15,
    paddingRight: 80,
    borderTopWidth: 1,
    height: 40,
    borderTopColor: theme.COLORS.BORDER_COLOR,
    color: theme.COLORS.TEXT,
    position: 'relative',
    flex: 1,
  },
  send: {
    width: 70,
    height: 40,
    backgroundColor: theme.COLORS.PRIMARY,
  },
  messagesContainer: {
    padding: theme.SIZES.BASE,
    flex: 1,
  },
  inputWrap: {
    flexDirection: 'row',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    padding: 15,
  },
});

export default Messages;
