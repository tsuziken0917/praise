import React,{useState} from "react"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import "../assets/styles/Input.css";
import InputStyle from "../assets/styles/Input-style";
import Button from '@material-ui/core/Button';
import Harry from '../assets/img/Harry.jpg'
import Ron from '../assets/img/Ron.jpg'
import Hermionie from '../assets/img/Hermionie.jpg'
import Voldemort from '../assets/img/Voldemort.jpg'

export default class Input extends React.Component {
   
    render() {
        return (
            <div className="input-box">
                <div className="input-user">
                <AvatarApp 
                targetUser={this.props.targetUser}
                />
                <SelectButtonApp
                changeTarget={this.props.changeTarget}
                />
                </div>
                <TextFieldApp      
                value={this.props.complimentText}
                onSubmit={this.props.onSubmit}
                onChange={this.props.onComplimentTextChange}
                /> 
            </div>
        );
    }
}

//アバターの画像切替
function AvatarApp(props){
    const classes = InputStyle();
    let img="";
    if(props.targetUser==="Harry") img=Harry;
    if(props.targetUser==="Ron") img=Ron;
    if(props.targetUser==="Hermionie") img=Hermionie;
    if(props.targetUser==="Voldemort") img=Voldemort;
        
    return (
      <div className={classes.root}>
        <Avatar alt="Remy Sharp" src={img} className={classes.avatarSize}/>
      </div>
    );
}


//ターゲットの名前選択
function SelectButtonApp(props) {
    const classes = InputStyle();
    const [inputName, setName] =useState("Ron");   

    const handleChange = (event) => {  
        setName(event.target.value)
        props.changeTarget(event.target.value);
       
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>Name</InputLabel>
                <Select
                    value={inputName}
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

  
function TextFieldApp(props) {
    const classes = InputStyle();
    const [inputText, setText] = useState("");
    const [inputLimit,setLimit]=useState(true);
    
    const handleChange = (event) => {
    if (event.target.value.length >= 5) {
        setText(event.target.value)
        setLimit(false)    
    }
    else {
        setText(event.target.value)
        setLimit(true)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(inputText);
  };
 
    return (
      <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField 
        value={inputText}
        onChange={handleChange}
        className={classes.textField}
        label="Input"
        /> 
         <Button variant="contained" type="submit" className={classes.sendButton} disabled={inputLimit}>送信</Button>    
      </form>
      
    );
  }

