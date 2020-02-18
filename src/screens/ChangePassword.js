import React from 'react'
import { Block } from 'galio-framework'
import {Input, Wrap, Button} from '../components'
import {bottomButton} from "../utils/globalStyles";


export default class ChangePassword extends React.Component {

  state = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  render () {
    return (
      <Wrap>
        <Input
          placeholder="Old Password"
          value={this.state.oldPassword}
          password
          onChangeText={oldPassword => this.setState({oldPassword})}
        />
        <Input
          placeholder="New Password"
          value={this.state.newPassword}
          password
          onChangeText={newPassword => this.setState({newPassword})}
        />
        <Input
          placeholder="Confirm Password"
          value={this.state.confirmPassword}
          password
          onChangeText={confirmPassword => this.setState({confirmPassword})}
        />
        <Button style={bottomButton}>
          Change password
        </Button>
      </Wrap>
    )
  }
}
