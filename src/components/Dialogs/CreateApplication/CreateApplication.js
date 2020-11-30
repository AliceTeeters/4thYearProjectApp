import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FileUploader from '../../Forms/FileUpload/FileUploader';


function CreateApplication({
    open, handleClose, onSubmit, isFullScreen, event
}){

    const [applicationHook, setHook ] = useState(""); 
    const [artistName, setName] = useState("");
    const [media, setMedia] = useState("");
    const {venueName, eventDateTime} = event;


    const handleSubmit = () => {
        const newApplication = {
            artistName,
            applicationHook,
            media
        };
        onSubmit(newApplication);
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
                    label="Artist"
                    defaultValue={artistName}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    multiline
                    rows="4"
                    label="Application Hook"
                    defaultValue={applicationHook}
                    onChange={(e) => setHook(e.target.value)}
                    variant="outlined"
                    inputProps={{ maxLength: 100}}
                />
                </Grid>
                <Grid item xs={12}>
                <FileUploader
                    id="media"
                    data-cy="media"
                    name="media"
                    label={"media"}
                    value={media}
                    handleChange={(e) => setMedia(e.target.value)}
                    multiple={false}
                    accept="mp3/*"
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