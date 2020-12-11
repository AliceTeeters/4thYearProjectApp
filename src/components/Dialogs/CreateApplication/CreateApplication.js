import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


function CreateApplication({
    open, handleClose, onSubmit, isFullScreen, event
}){

    const [applicationHook, setHook ] = useState(""); 
    const [artistName, setName] = useState("");
    const {eventId, venueName, eventDateTime} = event;

    const resetApplication = () => {
        setHook("");
        setName("");
    }

    const handleSubmit = () => {
        const newApplication = {
            artistName,
            applicationHook
        };
        onSubmit(newApplication, eventId);
        resetApplication();
    };

    return(
        <Dialog
        isFullScreen={isFullScreen || false}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>Apply for Event, {venueName} at {eventDateTime}</DialogTitle>
            <DialogContent>
            <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="flex-end">
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Artist Name"
                    value={artistName}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    multiline
                    rows="6"
                    label="Why should you be picked for the event"
                    value={applicationHook}
                    onChange={(e) => setHook(e.target.value)}
                    variant="outlined"
                    inputProps={{ maxLength: 300}}
                    helperText={`${applicationHook.length}/${300}`}
                />
                </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}

CreateApplication.defaultProps = {
    artistName: "",
    applicationHook: "",
    media: ""
}

export default CreateApplication;