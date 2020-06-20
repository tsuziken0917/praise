import React from 'react';
import './assets/styles/style.css';
import { Post, User, Input } from './components/index';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      storage:true,
      users: [],
      posts: [],
      currentUser: "Harry",
      targetUser: "Ron",
    }
  }

  componentWillMount() {
    const storage = localStorage.getItem('storage');
    if (storage === null) {
    
    let posts=[];
    let users = this.state.users
    let postID=-1;
    
    users.push(this.createUser(0, "Harry"))
    users.push(this.createUser(1, "Ron"))
    users.push(this.createUser(2, "Hermionie"))
    users.push(this.createUser(3, "Voldemort"))
    localStorage.setItem('storage', false);
    this.setState({storage: false});

    localStorage.setItem('postID', JSON.stringify(postID));
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('posts', JSON.stringify(posts));

    }
    
    const storageUsers = localStorage.getItem('users');
    const storagePosts = localStorage.getItem('posts');


    this.setState({
      users: JSON.parse(storageUsers),
      posts: JSON.parse(storagePosts),
    });
  }

  componentDidUpdate() {   
    localStorage.setItem('posts', JSON.stringify(this.state.posts));
    localStorage.setItem('users', JSON.stringify(this.state.users));
  }

  createUser(id, user) {
    return ({
      id: id,
      name: user,
      applausePoint: 100,
      applaudedPoint: 0,
    });
  }

  changeUser = (name) => {
    this.setState({ currentUser: name });
  };

  changeTargetUser = (name) => {
    this.setState({ targetUser: name });
  };


  handleComplimentSubmit = (value) => {
    let posts = this.state.posts
    const storagePostID = localStorage.getItem('postID');
    let postID=JSON.parse(storagePostID)
    postID +=1
    const currentTime = new Date();
    posts.push(createPost(postID, currentTime, currentTime, this.state.currentUser, this.state.targetUser, value));
    posts.sort(function (a, b) {
      if (a.id > b.id) return -1;
      if (a.id < b.id) return 1;
      return 0;
    })
    console.log(posts)
    this.setState({ posts: posts });
    localStorage.setItem('postID', JSON.stringify(postID));

  };


  handleApplause = (post) => {
    let postList = [];
    let userList = [];


    this.state.posts.map((elPost, index) => {
      if (post.id === elPost.id) {
        let currentUserApplause = elPost.applauses[this.state.currentUser];

        if (currentUserApplause === undefined) {
          currentUserApplause = 1;
          elPost.applauses["sum"] += 1
        }
        else {
          if (currentUserApplause < 15) {
            currentUserApplause += 1;
            elPost.applauses["sum"] += 1
          }
        }
        elPost.applauses[this.state.currentUser] = currentUserApplause;
      }
      postList.push(elPost)
      this.setState({ posts: postList });
    });

    this.state.users.map((elUser, index) => {
      if (post.applauses[this.state.currentUser] <= 15) {
        if (elUser.name === this.state.currentUser && elUser.applausePoint >= 0) {
          elUser.applausePoint -= 2;
        }
        if (elUser.name === post.currentUser || elUser.name === post.targetUser) {
          elUser.applaudedPoint += 1;
        }
      }
      userList.push(elUser)
      this.setState({ users: userList });
    });

    if (post.applauses[this.state.currentUser] === 15) {
      post.applauses[this.state.currentUser]++
    }
  };


  render() {
    return (
      <div className="wrapper">
        <div className="box">
          <User
            users={this.state.users}
            currentUser={this.state.currentUser}
            changeUser={this.changeUser}
          />
          <Post
            users={this.state.users}
            postList={this.state.posts}
            onApplause={this.handleApplause}
            currentUser={this.state.currentUser}
            targetUser={this.state.targetUser}
            handleApplauseUser={this.handleApplauseUser}
          />
          <Input
            userList={this.state.users}
            complimentText={this.state.complimentText}
            changeTarget={this.changeTargetUser}
            currentUser={this.state.currentUser}
            targetUser={this.state.targetUser}
            onSubmit={this.handleComplimentSubmit}
          />

        </div>
      </div>
    );
  }
}

export default App;


function createPost(id, times, postTime, postUser, targetUser, textCompliment) {
  return ({
    id: id,
    time: times,
    postTime: time(postTime),
    currentUser: postUser,
    targetUser: targetUser,
    textCompliment: textCompliment,
    applauses: { "sum": 0 },
  });
}

function time(time) {
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  let hour = time.getHours();
  let minutes = time.getMinutes();

  return year + "/" + month + "/" + date + " " + hour + ":" + minutes

}