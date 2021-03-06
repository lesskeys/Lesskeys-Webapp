import React, { Component } from 'react';
import '../../style/AILocks.css';
import * as FontAwesome from 'react-icons/fa';

class Lock extends Component {
  constructor (props) {
    super(props);

    this.state = {
      data: props.data,
      name: props.data.name,
      ip: props.data.address,
      psk: "",
      inEditMode: false,
      inPskMode: false
    }
  }

  toggleEditable = () => {
    this.setState({
      inEditMode: !this.state.inEditMode
    })
  }

  togglePsk = () => {
    this.setState({
      inPskMode: !this.state.inPskMode
    })
  }

  updateName (evt) {
    this.setState({
      name: evt.target.value
    })
  }

  updateIp (evt) {
    this.setState({
      ip: evt.target.value
    })
  }

  updatePsk (evt) {
    this.setState({
      psk: evt.target.value
    })
  }

  saveLock = () => {
    fetch('/ai/' + this.state.data.lockId + '/edit', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset-UTF-8"
      },
      body: JSON.stringify({
        name: this.state.name,
        address: this.state.ip
      })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (!data.value === 'true') {
        this.props.error()
      }
    })
    this.toggleEditable()
  }

  render () {

    if (this.state.inEditMode) {
      return (
        <div className="lockContainer">
          <div className="lockItemName">
            <input type="text" value={this.state.name} onChange={(e) => this.updateName(e)} />
          </div>
          <div className="lockItemIp">
            <input type="text" value={this.state.ip} onChange={(e) => this.updateIp(e)} />
          </div>
          <div className="lockItemButtonContainer">
            <div className="abort" onClick={this.toggleEditable}>
              <FontAwesome.FaTimes className="icon" />
            </div>
            <div className="save" onClick={this.saveLock}>
              <FontAwesome.FaCheck className="icon" />
            </div>
          </div>
        </div>
      )
    } else if (this.state.inPskMode) {
      return (
        <div className="lockContainer">
          <div className="lockItemName">
            <input type="text" value={this.state.psk} onChange={(e) => this.updatePsk(e)} />
          </div>
          <div className="lockItemButtonContainer">
            <div className="abort" onClick={this.togglePsk}>
              <FontAwesome.FaTimes className="icon" />
            </div>
            <div className="save" onClick={this.togglePsk}>
              <FontAwesome.FaCheck className="icon" />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="lockContainer">
          <div className="lockItemName">
            {this.state.name}
          </div>
          <div className="lockItemIp">
            {this.state.ip}
          </div>
          <div className="lockItemButtonContainer">
            <div className="edit" onClick={this.toggleEditable}>
              <FontAwesome.FaPen className="icon" />
            </div>
            <div className="psk" onClick={this.togglePsk}>
              <FontAwesome.FaKey className="icon" />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Lock;