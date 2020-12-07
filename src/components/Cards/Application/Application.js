import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Avatar, CardActionArea, Typography, Button, Grid, Hidden} from '@material-ui/core';

import ApplicationDialog from '../../Dialogs/Application/Application'

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        maxHeight: 150,
        padding: 10,
    },
    title: {
      fontSize: 20,
      margin: 5,
    },
    media: {
        height: 50,
      },
  });

function Application({application, acceptApplication}){

    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const {artistName, applicationHook, applicationImg} = application;

    const Open = () => { setOpen(true);}
    const Close = () => { setOpen(false);}

    return(
        <React.Fragment>
        <Card className={classes.root} variant="outlined">
            <CardActionArea onClick={Open}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                <Avatar
                className={classes.media}
                src={applicationImg ? applicationImg : "https://www.hopkinsmedicine.org/-/media/feature/noimageavailable.ashx"}
                title="venue"
                />
                </Grid>
                <Grid item xs={3}>
                <Typography className={classes.title}>{artistName}</Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography component="p">{applicationHook}</Typography>
                </Grid>
                </Grid>
            </CardActionArea>
        </Card>
        <ApplicationDialog 
        open={open}
        handleClose={Close}
        application={application}
        acceptApplication={acceptApplication}/>
        </React.Fragment>
)
}

export default Application;