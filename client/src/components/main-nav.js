import { NavLink } from "react-router-dom";
import React from "react";
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
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
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

function MainNav(props){
  console.log(props)

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
  // <div className="navbar-nav mr-auto">
  //   <NavLink
  //     to="/"
  //     exact
  //     className="nav-link"
  //     activeClassName="router-link-exact-active"
  //   >
  //     Home
  //   </NavLink>
  //   <NavLink
  //     to="/coinbaseAPI"
  //     exact
  //     className="nav-link"
  //     activeClassName="router-link-exact-active"
  //   >
  //     CoinbaseAPI
  //   </NavLink> 
  //   <NavLink
  //     to="/profile"
  //     exact
  //     className="nav-link"
  //     activeClassName="router-link-exact-active"
  //   >
  //     Profile
  //   </NavLink>
  //   <NavLink
  //     to="/TicketMarketPlace"
  //     exact
  //     className="nav-link"
  //     activeClassName="router-link-exact-active"
  //   >
  //     Ticket Marketplace
  //   </NavLink>
  //   <NavLink
  //     to="/CreateEvent"
  //     exact
  //     className="nav-link"
  //     activeClassName="router-link-exact-active"
  //   >
  //     Create Event
  //   </NavLink>
  //   <NavLink
  //     to="/Checkout"
  //     exact
  //     className="nav-link"
  //     activeClassName="router-link-exact-active"
  //   >
  //     CheckOut
  //   </NavLink>
  //   <NavLink
  //     to="/Buyer"
  //     exact
  //     className="nav-link"
  //     activeClassName="router-link-exact-active"
  //   >
  //     Buyer
  //   </NavLink>
  //   <NavLink
  //     to="/Seller"
  //     exact
  //     className="nav-link"
  //     activeClassName="router-link-exact-active"
  //   >
  //     Seller
  //   </NavLink>
  // </div>
  <div className={classes.root}>

      <div>
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
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <NavLink
                      to="/Buyer"
                      exact
                      className="nav-link"
                      activeClassName="router-link-exact-active"
                      onClick={handleClose}
                    >
                      Buyer
                    </NavLink>
                    <NavLink
                      to="/Seller"
                      exact
                      className="nav-link"
                      activeClassName="router-link-exact-active"
                      onClick={handleClose}
                    >
                      Seller
                    </NavLink>
                    <NavLink
                      to="/TicketFeed"
                      exact
                      className="nav-link"
                      activeClassName="router-link-exact-active"
                      onClick={handleClose}
                    >
                      Ticket Feed
                    </NavLink>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Button href="/CreateEvent">
          <span style={{ color: `white` }}>Create Event</span>
        </Button>
      </div>
    </div>
  )
};

export default MainNav;
