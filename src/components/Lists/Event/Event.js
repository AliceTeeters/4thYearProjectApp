import React from 'react';
import { Grid } from '@material-ui/core';
import Event from '../../Cards/Event/Event';


  function EventList({events, createApplication, acceptApplication, applications}){


    const renderEventCard = (event) => {
        return (
          <Event
            event={event}
            createApplication={createApplication}
            applications={applications}
            acceptApplication={acceptApplication}
          />
        );
      };

    return(
        <Grid container spacing={1}>
        {events.map(event => {
            return (
                <Grid item xs={4}>
                  {renderEventCard(event)}
                </Grid>
              )
    })}
    </Grid>
    );
  };

  export default EventList;