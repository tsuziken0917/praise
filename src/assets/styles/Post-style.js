import { makeStyles,createStyles } from '@material-ui/core/styles';

const ChatsStyle =makeStyles((theme) => 
createStyles({
    "root": {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    "inline": {
      display: 'inline',
    },
  }));

export default ChatsStyle