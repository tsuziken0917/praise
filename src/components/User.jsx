import React,{useState} from "react"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import "../assets/styles/User.css";
import UserStyle from "../assets/styles/User-style";
import Harry from '../assets/img/Harry.jpg'
import Ron from '../assets/img/Ron.jpg'
import Hermionie from '../assets/img/Hermionie.jpg'
import Voldemort from '../assets/img/Voldemort.jpg'

export default class User extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        let currentUser=this.props.currentUser
        if(currentUser==="Harry") currentUser=0
        if(currentUser==="Ron") currentUser=1
        if(currentUser==="Hermionie") currentUser=2
        if(currentUser==="Voldemort") currentUser=3

        return (
            <div className="user-box">
                <AvatarApp
                currentUser={this.props.currentUser}
                />
                <SelectButtonApp 
                changeUser={this.props.changeUser}
                />
                <div>
                <p>拍手できる:{this.props.users[currentUser].applausePoint}</p>
                <p>拍手された:{this.props.users[currentUser].applaudedPoint}</p>
                </div>
            </div>
        );
    }
}

function AvatarApp(props){
    const classes = UserStyle();
    let img="";
    if(props.currentUser==="Harry") img=Harry;
    if(props.currentUser==="Ron") img=Ron;
    if(props.currentUser==="Hermionie") img=Hermionie;
    if(props.currentUser==="Voldemort") img=Voldemort;
        
    return (
      <div className={classes.root}>
        <Avatar alt="Remy Sharp" src={img} className={classes.avatarSize}/>
      </div>
    );
}
//SelectButton(material-UI使用)
function SelectButtonApp(props) {
    const classes = UserStyle();
    const [inputUser, setUser] = useState("Harry");

    const handleChange = (event) => {
        setUser(event.target.value);
        props.changeUser(event.target.value);

    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>User</InputLabel>
                <Select
                    value={inputUser}
                    onChange={handleChange}
                 >
                    <MenuItem value={"Harry"}>Harry</MenuItem>
                    <MenuItem value={"Ron"}>Ron</MenuItem>
                    <MenuItem value={"Hermionie"}>Hermionie</MenuItem>
                    <MenuItem value={"Voldemort"}>Voldemort</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

