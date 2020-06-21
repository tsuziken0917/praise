import React from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import "../assets/styles/Post.css";
import ChatsStyle from "../assets/styles/Post-style";
import Harry from '../assets/img/Harry.jpg'
import Ron from '../assets/img/Ron.jpg'
import Hermionie from '../assets/img/Hermionie.jpg'
import Voldemort from '../assets/img/Voldemort.jpg'
import ReactTooltip from 'react-tooltip'

let postCount = -1;//postの連想配列のキーのためのカウント変数

export default class Post extends React.Component {
  postCount() {
    postCount += 1;
    return postCount;
  }
  postCountReset() {
    postCount = -1;
  }

  render() {
    return (
      <div className="chats-box" id={"scroll-area"}>
        {console.log(this.props.postList)}
        {this.props.postList.map((chat, index) => {
          this.postCount()
          return (
            <ChatApp
              id={chat.id}
              text={chat.textCompliment}
              time={chat.postTime}
              chatCurrentUser={chat.currentUser}
              chatTargetUser={chat.targetUser}
              chatApplauses={chat.applauses}
              onApplause={this.props.onApplause}  
              postList={this.props.postList}
              currentUser={this.props.currentUser}
              targetUser={this.props.targetUser}
              handleApplauseUser={this.props.handleApplauseUser}
              users={this.props.users}
              key={index.toString()}
              postCount={postCount}
            />
          )
        })}
        {this.postCountReset()}
      </div>
    );
  }
}

function ChatApp(props) {
  const classes = ChatsStyle();
  let currentUser = "";
  let targetUser = "";
  let applauses = "";
  let postApplauses = props.postList[props.postCount].applauses;
  let applauseNames = [];
  let applauseUsers = [];

  let inputLimit = false
  let currentUserName = props.currentUser
  if (currentUserName === "Harry") currentUserName = 0
  if (currentUserName === "Ron") currentUserName = 1
  if (currentUserName === "Hermionie") currentUserName = 2
  if (currentUserName === "Voldemort") currentUserName = 3

  if (props.currentUser === props.chatCurrentUser ||
    props.currentUser === props.chatTargetUser ||
    props.postList[props.postCount].applauses[props.currentUser] >= 15 ||
    props.users[currentUserName].applausePoint === 0) {
    inputLimit = true;
  }

  //postListをid順(＝時間順)でソート
  props.postList.sort(function (a, b) {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
    return 0;
  })

  if (props.chatCurrentUser === "Harry") currentUser = Harry;
  if (props.chatCurrentUser === "Ron") currentUser = Ron;
  if (props.chatCurrentUser === "Hermionie") currentUser = Hermionie;
  if (props.chatCurrentUser === "Voldemort") currentUser = Voldemort;

  if (props.chatTargetUser === "Harry") targetUser = Harry;
  if (props.chatTargetUser === "Ron") targetUser = Ron;
  if (props.chatTargetUser === "Hermionie") targetUser = Hermionie;
  if (props.chatTargetUser === "Voldemort") targetUser = Voldemort;

  applauses = props.postList[props.id].applauses;

  //handleApplauseはpostsのapplausehandle
  const handleApplause = () => {
    props.onApplause(props.postList[props.postCount]);
  };

  function applauseList() {
    //sum以外のキーを取得
    let applauseList = [];
    applauseNames = Object.keys(postApplauses).slice(1)
    applauseNames.map((name, index) => {
      applauseUsers.push(createApplauseList(name))
    })
    //applauseUsersを昇降順に並べる
    applauseUsers.sort(function (a, b) {
      if (a.applause > b.applause) return -1;
      if (a.applause < b.applause) return 1;
      return 0;
    });

    applauseUsers.map((applauseUser, index) => {
      applauseList.push(<li key={index}>{applauseUser.name}:{applauseUser.applause}</li>)
    })
    return applauseList;
  }

  function createApplauseList(user) {
    let applause = postApplauses[user]
    if (applause === 16) { applause -= 1 }
    return ({
      id: props.id,
      name: user,
      applause: applause
    });
  }

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <div>
            <Avatar alt="Remy Sharp" src={currentUser} />
            <div>↓</div>
            <Avatar alt="Remy Sharp" src={targetUser} />
          </div>
        </ListItemAvatar>
        <ListItemText>
          <div>{props.text}</div>
          <p>{props.time}</p>
          <span data-tip data-for={String(props.postCount)}>
            <Button variant="outlined" color="secondary" onClick={handleApplause} disabled={inputLimit}>
            <span role = "img" aria-label = "applause">👏</ span>{props.chatApplauses.sum}
            </Button>
          </span>
          <ReactTooltip id={String(props.postCount)} place="bottom">
            <ul>
              {applauseList()}
            </ul>
          </ReactTooltip>
        </ListItemText>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

