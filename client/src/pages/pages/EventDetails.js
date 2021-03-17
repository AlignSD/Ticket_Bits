import React from "react";
import Card from "../components/Card";
import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className="container">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <img
              src="https://ra.co/images/events/flyer/2020/1/cz-0110-1362019-back.jpg"
              alt=""
              className="img-fluid"
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Typography variant="h4" className={classes.title}>
              Event Name
            </Typography>
            <Typography variant="h5" className={classes.title}>
              Event Location
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Event Date/Time
            </Typography>
            <hr />
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.paragraphText}
            >
              <strong>Description:</strong> Zombie ipsum reversus ab viral
              inferno, nam rick grimes malum cerebro. De carne lumbering animata
              corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De
              apocalypsi gorger omero undead survivor dictum mauris. Hi mindless
              mortuis soulless creaturas, imo evil stalking monstra adventus
              resi dentevil vultus comedat cerebella viventium. Qui animated
              corpse, cricket bat max brucks terribilem incessu zomby. The
              voodoo sacerdos flesh eater, suscitat mortuos comedere carnem
              virus. Zonbi tattered for solum oculi eorum defunctis go lum
              cerebro. Nescio brains an Undead zombies. Sicut malus putrid
              voodoo horror. Nigh tofth eliv ingdead.
            </Typography>
          </Grid>
        </Grid>
        <hr />
        <Typography variant="h4" className={classes.title}>
          Other Events You May Like
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
