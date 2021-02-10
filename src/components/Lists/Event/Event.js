import React from 'react';
import { Grid } from '@material-ui/core';
import Event from '../../Cards/Event/Event';


  function EventList({events, createApplication, acceptApplication, user}){

    const renderEventCard = (events) => {
      console.log('events', events);
      console.log('user', user);
      if(events !== []){
        return (
          <Grid container spacing={1}>
        {events.map(event => {
            return (
                <Grid item xs={4}>
                <Event
                event={event}
                createApplication={createApplication}
                acceptApplication={acceptApplication}
                user={user}
              />
                </Grid>
              )
      })}
    </Grid>
        );
    }
      };

    return(
      <React.Fragment>
      {renderEventCard(events)}
      </React.Fragment>
    );
  };

  export default EventList;