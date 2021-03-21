import React from "react";
import { IconButton, makeStyles, Toolbar } from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import PayPal from "../components/Paypal"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  iconButton: {
    color: "white",
    marginLeft: 20,
    paddingBottom: 6,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  logOut:{
    color: "#ffffff",
    backgroundColor: "#000000",
    '&:hover': {
      backgroundColor: '#3d4c65',
      boxShadow: 'black',
    },
    popItem:{
      paddingleft: "0 5px"
    },
    popper:{
      width: 5
    }
  }
}));

const CheckoutButton = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

const handleToggle = () => {
  setOpen((prevOpen) => !prevOpen);
};

const handleClose = (event) => {
  if (anchorRef.current && anchorRef.current.contains(event.target)) {
    return;
  }
    setOpen(false);
};

function handleListKeyDown(event) {
  if (event.key === 'Tab') {
    event.preventDefault();
    setOpen(false);
  }
}

// return focus to the button when we transitioned from !open -> open
const prevOpen = React.useRef(open);
React.useEffect(() => {
  if (prevOpen.current === true && open === false) {
    anchorRef.current.focus();
  }

  prevOpen.current = open;
}, [open]);

  const classes = useStyles();
  return (

    <div className={classes.root}>
      <Toolbar>
  <IconButton edge="start" className={classes.iconButton}
  ref={anchorRef}
  aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}>
      <ShoppingCartIcon fontSize="default" />
      <span style={{ fontSize: 14 }}>CHECKOUT</span>
  </IconButton>
  <IconButton edge="start" className={classes.iconButton}
    >
         <Popper open={open} placement="bottom" role={undefined} transition disablePortal style={{top: "10%", right: "5%", left: "75%", width: "20%"}}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{  }}
            >
              <Paper className={classes.pop}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <Grid className={classes.popitem}>
                      <PayPal className={classes.popper}/>
                    </Grid>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
          </Popper>
         
  </IconButton>
  </Toolbar>
  </div>
  );
};

export default CheckoutButton;