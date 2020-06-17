import React, { useState, useEffect } from "react"
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

export default class Post extends React.Component {
  constructor(props) {
    super(props)
   
  }

  render(){
    return (

      <div className="chats-box" id={"scroll-area"}>
        {this.props.postList.map((chat, index) => {
          return (
            <ChatApp
              id={chat.id}
              text={chat.textCompliment}
              time={chat.postTime}
              onApplause={this.props.onApplause}
              applause={chat.applause}
              postList={this.props.postList}
              currentUser={this.props.currentUser}
              targetUser={this.props.targetUser}
              handleApplauseUser={this.props.handleApplauseUser}
              users={this.props.users}
              key={index.toString()}
            />
          )
        })}
      </div>
    );
  }
}

function ChatApp(props) {
  const classes = ChatsStyle();
  let currentUser = "";
  let targetUser = "";
  let applauses = "";
  let postApplauses = props.postList[props.id].applauses;
  let applauseNames=[];
  let applauseUsers=[];

  
  let inputLimit = false
  let currentUserName = props.currentUser
  if (currentUserName === "Harry") currentUserName = 0
  if (currentUserName === "Ron") currentUserName = 1
  if (currentUserName === "Hermionie") currentUserName = 2
  if (currentUserName === "Voldemort") currentUserName = 3

  if (props.currentUser === props.postList[props.id].currentUser ||
    props.currentUser === props.postList[props.id].targetUser ||
    props.postList[props.id].applauses[props.currentUser] >= 15 ||
    props.users[currentUserName].applausePoint === 0) {
    inputLimit = true;
  }

  if (props.postList[props.id].currentUser === "Harry") currentUser = Harry;
  if (props.postList[props.id].currentUser === "Ron") currentUser = Ron;
  if (props.postList[props.id].currentUser === "Hermionie") currentUser = Hermionie;
  if (props.postList[props.id].currentUser === "Voldemort") currentUser = Voldemort;

  if (props.postList[props.id].targetUser === "Harry") targetUser = Harry;
  if (props.postList[props.id].targetUser === "Ron") targetUser = Ron;
  if (props.postList[props.id].targetUser === "Hermionie") targetUser = Hermionie;
  if (props.postList[props.id].targetUser === "Voldemort") targetUser = Voldemort;

  applauses = props.postList[props.id].applauses;


  const handleApplause = () => {
    props.onApplause(props.postList[props.id]);
  };

  //sum以外のキーを取得



　applauseNames=Object.keys(postApplauses).slice(1)

  applauseNames.map((name,index)=>{
    applauseUsers.push(createApplauseList(name))
  })
 
  //applauseUsersを昇降順に並べる
  applauseUsers.sort(function(a,b){
    if(a.applause>b.applause) return -1;
    if(a.applause<b.applause) return 1;
    return 0;
});





 function createApplauseList(user) {
  let applause=postApplauses[user]
  if(applause===16) {applause-=1}
  return ({
    name: user,
    applause:applause
  });
}



  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={currentUser} />
          <div>↓</div>
          <Avatar alt="Remy Sharp" src={targetUser} />
        </ListItemAvatar>
        <ListItemText>
          <div>{props.text}</div>
         
          <p>{props.time}</p>
            <span data-tip data-for="hover"><Button  variant="outlined" color="secondary" onClick={handleApplause} disabled={inputLimit} >{applauses.sum}</Button></span>
         
            <ReactTooltip id="hover" place="bottom">
           <ul>
            {
              applauseUsers.map( applauseUser =>
              <li>{applauseUser.name}:{applauseUser.applause}</li>
            )}
            </ul>
            </ReactTooltip>
        </ListItemText>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );

  
}

