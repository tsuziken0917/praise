import { makeStyles,createStyles } from '@material-ui/core/styles';

const InputStyle = makeStyles(() => 
createStyles({
    "root": {
        margin:"0 auto",
    },
    "avatarSize": {
        width: "50px",
        height: "50px",
    },
    "formControl": {
        minWidth: 70,
    },
    "textField":{
        width: "200px",
    },
    "sendButton":{
        background:"#009688",
        marginLeft:"10px",
        "&:hover":{
            background:"#B2DFB2"
        }
    },
   
    

   
}));

export default InputStyle