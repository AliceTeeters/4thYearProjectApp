import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography } from '@material-ui/core';
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

function ApplicationDialog({open, handleClose, application, isFullScreen, acceptApplication}){

    const classes = useStyles();
    const {artistName, applicationHook, applicationImg} = application;

    const handleAccept = () => {
        acceptApplication(application);
    }

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
                <Typography className={classes.title}>{artistName}</Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography component="p">{applicationHook}</Typography>
                </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
                <Button className={classes.button} variant="contained" disabled>Message</Button>
                <Button className={classes.button} variant="contained" onClick={handleAccept}>Accept</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

ApplicationDialog.propTypes = {
    application: PropTypes.object,
    acceptApplication: PropTypes.func,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    isFullScreen: PropTypes.bool
  };

export default ApplicationDialog;