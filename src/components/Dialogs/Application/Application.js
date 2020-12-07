import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Avatar, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        maxHeight: 150,
        padding: 10,
    },
    title: {
      fontSize: 20,
    },
    media: {
        height: 50,
      },
      button: {
        margin: 5,
    }
  });

function ApplicationDialog({
    open, handleClose, application, isFullScreen, acceptApplication
}){

    const classes = useStyles();
    const {artistName, applicationHook, applicationImg} = application;

    return(
        <Dialog
        isFullScreen={isFullScreen || false}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        >
            <DialogTitle></DialogTitle>
            <DialogContent>
            <Grid container spacing={1}>
                    <Grid item xs={12}>
                <Avatar
                className={classes.media}
                src={applicationImg ? applicationImg : "https://www.hopkinsmedicine.org/-/media/feature/noimageavailable.ashx"}
                title="venue"
                />
                </Grid>
                <Grid item xs={12}>
                <Typography className={classes.title}>{artistName}</Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography component="p">{applicationHook}</Typography>
                </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
                <Button className={classes.button} variant="contained">Message</Button>
                <Button className={classes.button} variant="contained" onClick={acceptApplication}>Accept</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ApplicationDialog;