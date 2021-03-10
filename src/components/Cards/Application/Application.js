import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardActionArea, Typography, Grid} from '@material-ui/core';
import defaultImage from '../../../images/band.jpg';
import ApplicationDialog from '../../Dialogs/Application/Application'

const useStyles = makeStyles({
    root: {
        maxWidth: 450,
        maxHeight: 600,
        marginBottom: 75,
        marginLeft: 75,
    },
    title: {
      fontSize: 20,
      margin: 5,
    },
    media: {
        height: 100,
      },
  });

function Application({application, acceptApplication}){

    const classes = useStyles();
    const [open, setOpen] = useState(false)

    const Open = () => { setOpen(true);}
    const Close = () => { setOpen(false);}

    return(
        <React.Fragment>
        <Card className={classes.root} variant="outlined">
            <CardMedia
                className={classes.media}
                component="img"
                image={application.artistImage}
                title="application"
                />
            <CardActionArea onClick={Open}>
                <Grid container spacing={1}>
                <Grid item xs={12}>
                <Typography className={classes.title}>{application.artistName}</Typography>
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

Application.propTypes = {
    application: PropTypes.object,
    acceptApplication: PropTypes.func
  };

export default Application;