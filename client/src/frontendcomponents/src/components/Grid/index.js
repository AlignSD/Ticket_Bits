import React from "react";
import Card from "../Card";
import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
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
        <Typography variant="h3" className={classes.title}>
            Events Near You
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
