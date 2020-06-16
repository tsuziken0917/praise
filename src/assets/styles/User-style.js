import { makeStyles,createStyles } from '@material-ui/core/styles';

const UserStyle = makeStyles((theme) => 
createStyles({
    "avatarSize": {
        width: "60px",
        height: "60px",
    },
    "formControl": {
        margin: theme.spacing(1),
        minWidth: 80,
    },
    "selectEmpty": {
        marginTop: theme.spacing(2),
    },
}));

export default UserStyle