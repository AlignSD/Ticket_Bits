import { NavLink } from "react-router-dom";
import React from "react";
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
// import Popup from '../components/Popup'

// MainNav links are visible to all users
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: "#686666"
  },
  dropcolor:{
    color: "#000000",
  },
  pop:{
    width: "150%"
  },
  popItem:{
    paddingleft: "0 5px"
  }
}));

function MainNav(props){
  const classes = useStyles();
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

  return(
  <div className={classes.root}>

      <div>
      <Button href="/Home">
          <span style={{ color: `white` }}>Home</span>
        </Button>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <span style={{ color: `white` }}>Marketplace</span>
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className={classes.pop}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <Grid className={classes.popitem}>
                    <NavLink
                      className={classes.dropcolor}
                      to="/Buyer"
                      exact
                      style={{paddingLeft: 10}}
                      activeClassName="router-link-exact-active"
                      onClick={handleClose}
                    >
                        Buyer
                    </NavLink>
                    </Grid>
                    <br></br>
                    <Grid>
                    <NavLink
                      to="/Seller"
                      exact
                      className={classes.dropcolor}
                      activeClassName="router-link-exact-active"
                      onClick={handleClose}
                      style={{paddingLeft: 10}}
                    >
                       Seller
                    </NavLink>
                    </Grid>
                    <br></br>
                    <Grid>
                    <NavLink
                      to="/TicketMarketPlace"
                      exact
                      className={classes.dropcolor}
                      activeClassName="router-link-exact-active"
                      onClick={handleClose}
                      style={{paddingLeft: 10}}
                    >
                      Ticket Feed
                    </NavLink>
                    
                    </Grid>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Button href="/CreateEvent">
          <span style={{ color: `white` }}>Create Event</span>
        </Button>
        <Button href="/EventDetails">
          <span style={{ color: `white` }}>Event Details</span>
        </Button>

      </div>
    </div>
  )
};

export default MainNav;
