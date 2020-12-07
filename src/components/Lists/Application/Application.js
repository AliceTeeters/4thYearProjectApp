import React from 'react';
import { GridList, GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Application from '../../Cards/Application/Application';


const useStyles = makeStyles(theme => ({
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
      },
      gridListTileRoot: {
        [theme.breakpoints.up('sm')]: {
          minWidth: 500,
        },
        height: 'auto',
        minWidth: 500,
        padding: '0px !important'
      },
      gridListTile: {
        padding: '6px'
      },
  }));

function ApplicationList({applications, acceptApplication}){

    const classes = useStyles();

    const renderApplicationCard = (application) => {
        return (
          <Application
            application={application}
            acceptApplication={acceptApplication}
          />
        );
      };

    return(
        <GridList container spacing={1}>
        {applications.map(application => {
            return (
              <GridListTile
                classes={{
                  root: classes.gridListTileRoot,
                  tile: classes.gridListTile,
                }}
              >
                {renderApplicationCard(application)}
              </GridListTile>
            )})
        }
        </GridList>
    )
};

export default ApplicationList;