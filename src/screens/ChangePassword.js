import React from 'react';
import {Input, Wrap, Button} from '../components';
import {bottomButton} from '../utils/globalStyles';
import {AuthContext} from "../context/contexts";
import {$post} from "../utils/Fetch";
import firebase from 'firebase/app';
import 'firebase/auth'
import {fire} from "../services";

const ChangePassword = () => {
  const [state, setState] = React.useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    loading: false,
  });

  const {user} = React.useContext(AuthContext);

  const handleUpdatePassword = async () => {
    if (state.loading) {
      return false;
    }
    if (state.newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return false;
    }
    if (state.newPassword !== state.confirmPassword) {
      alert('New Passwords do not match');
      return false;
    }
    setState({
      ...state,
      loading: true,
    });
    const data = new FormData();
    data.append('password', state.newPassword);
    fire.user.updatePassword(state.newPassword).then(async () => {
      alert('Password changed');
      setState({
        ...state,
        loading: false,
      })
    }).catch(function(error) {
      console.log('fberror', error)
    });
  };

  return (
    <Wrap>
      <Input
        placeholder="Old Password"
        value={state.oldPassword}
        password
        onChangeText={oldPassword => setState({...state, oldPassword})}
      />
      <Input
        placeholder="New Password"
        value={state.newPassword}
        password
        onChangeText={newPassword => setState({...state, newPassword})}
      />
      <Input
        placeholder="Confirm Password"
        value={state.confirmPassword}
        password
        onChangeText={confirmPassword => setState({...state, confirmPassword})}
      />
      <Button loading={state.loading} onPress={handleUpdatePassword} style={bottomButton}>Change password</Button>
    </Wrap>
  );
};

export default ChangePassword;
