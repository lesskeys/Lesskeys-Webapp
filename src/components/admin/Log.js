import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../style/AILog.css'

class Log extends Component {
  constructor (props) {
    super(props);

    this.state = {
      data: props.data
    }
  }

  render () {

    var event = new Date(this.props.data.logTime);
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' , hour: 'numeric' , minute: 'numeric' };

    if (!(event.getFullYear() === this.props.filter.date.getFullYear() &&
        event.getMonth() === this.props.filter.date.getMonth() &&
        event.getDate() === this.props.filter.date.getDate())) {
      return null
    } else if (!(this.props.data.type === this.props.filter.type.value) && !(this.props.filter.type.value === 'ALL')) {
      return null
    }

    var actorName = ""
    if (this.props.data.actor.startsWith("User")) {
      var actorId = this.props.data.actor.split(" ")[1]
      var user = this.props.userList.find(u => {
        return u.userId === parseInt(actorId, 10)
      })
      actorName = user.email
    }


    return (
      <div className="logContainer">
        <div className="logItemDate">
          {event.toLocaleDateString('de-DE', options)}
        </div>
        <div className="logItemType">
          {this.props.data.type}
        </div>
        <div className="logItemEvent">
          {this.props.data.event}
        </div>
        <div className="logItemActor">
          {actorName.split("@")[0]}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    userList: store.userListReducer.userList
  }
}

export default connect(mapStateToProps)(Log);