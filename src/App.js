import React from 'react';
import './assets/styles/style.css';
import { Post, User, Input } from './components/index';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      storage: true,
      users: [],
      posts: [],
      currentUser: "Harry",
      targetUser: "Ron",
    }
  }

  componentWillMount() {
    let storage = localStorage.getItem('storage');
    if (storage === null) {

      let posts = [];
      let users = [];
      let postID = -1;

      users.push(this.createUser(0, "Harry"))
      users.push(this.createUser(1, "Ron"))
      users.push(this.createUser(2, "Hermionie"))
      users.push(this.createUser(3, "Voldemort"))

      this.setState({ storage: false });

      localStorage.setItem('postID', JSON.stringify(postID));
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('posts', JSON.stringify(posts));
    }
    this.setState({
      users: JSON.parse(localStorage.getItem('users')),
      posts: JSON.parse(localStorage.getItem('posts')),
    });
    localStorage.setItem('storage', false);
  }

  componentDidUpdate() {
    localStorage.setItem('posts', JSON.stringify(this.state.posts));
    localStorage.setItem('users', JSON.stringify(this.state.users));
  }

  createPost = (id, times, postTime, postUser, targetUser, textCompliment) => {
    return ({
      id: id,
      time: times,
      postTime: this.time(postTime),
      currentUser: postUser,
      targetUser: targetUser,
      textCompliment: textCompliment,
      applauses: { "sum": 0 },
    });
  }

  createUser = (id, user) => {
    return ({
      id: id,
      name: user,
      applausePoint: 100,
      applaudedPoint: 0,
    });
  }

  time = (time) => {
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let hour = time.getHours();
    let minutes = time.getMinutes();
    return year + "/" + month + "/" + date + " " + hour + ":" + minutes
  }

  changeUser = (name) => {
    this.setState({ currentUser: name });
  };

  changeTargetUser = (name) => {
    this.setState({ targetUser: name });
  };

  handleComplimentSubmit = (value) => {
    let posts = this.state.posts
    let postID = JSON.parse(localStorage.getItem('postID'))
    postID += 1
    const currentTime = new Date();
    posts.push(this.createPost(postID, currentTime, currentTime, this.state.currentUser, this.state.targetUser, value));
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

    this.state.posts.map((iPost,index) => {
      if (post.id === iPost.id) {
        let currentUserApplause = iPost.applauses[this.state.currentUser];

        if (currentUserApplause === undefined) {
          currentUserApplause = 1;
          iPost.applauses["sum"] += 1
        }
        else {
          if (currentUserApplause < 15) {
            currentUserApplause += 1;
            iPost.applauses["sum"] += 1
          }
        }
        iPost.applauses[this.state.currentUser] = currentUserApplause;
      }
      postList.push(iPost)
      this.setState({ posts: postList });
    });

    this.state.users.map((iUser, index) => {
      if (post.applauses[this.state.currentUser] <= 15) {
        if (iUser.name === this.state.currentUser && iUser.applausePoint >= 0) {
          iUser.applausePoint -= 2;
        }
        if (iUser.name === post.currentUser || iUser.name === post.targetUser) {
          iUser.applaudedPoint += 1;
        }
      }
      userList.push(iUser)
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

