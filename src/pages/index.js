/* eslint react/prop-types: 0 */
import Amplify, {Auth} from "aws-amplify";
import React, {useEffect, useState} from "react"
import awsExports from "../aws-exports";
//import { ThemeProvider } from '@material-ui/styles';
import ViewEvents from '../components/View/Events/Events';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import SetUser from "../components/Cards/SetUser/SetUser";
import { uploadUserImage } from '../functions/imageUpload'; 
import NavBar from '../components/View/NavBar/NavBar';
import CreateEvent from '../components/Dialogs/CreateEvent/CreateEvent';
import { createNewEvent, createAcceptedEvent, fetchEvents, updateEventState } from '../functions/Events';
import { createNewApplication } from '../functions/Applications';
// import AmplifyTheme from '../misc/AmplifyTheme';

Amplify.configure(awsExports);

const IndexPage = () => {
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const userdetails = await Auth.currentUserInfo();
      console.log('User:', userdetails);
      setUser(userdetails);
  }
  const getEvents = async () => {
    const eventsList = await fetchEvents();
    setEvents(eventsList);
  }

    getEvents();
    getUser();
    console.log('User:', user);
    console.log('Events:', events);
  }, []);
   
  const handleAuthChange = async () => {
    await getUser();
    await getEvents();
  }

  const handleCreateEvent = async (event) => {
      try {
          console.log(event);
          await createNewEvent(event).then(res => {
              setEvents([...events, res]);
          });
          await getEvents();
      } catch (error) {
          console.log(error);
      }
  };

  const handleCreateApplication = async (application, eventId) => {
      try {
          await createNewApplication(application, eventId, user.username).then(res => {
              const updatedEvents = updateEventState(events, res);
              setEvents(updatedEvents);
          });
      } catch (error) {
          console.log(error);
      }
  };

  const handleAcceptApplication = async (event, application) => {
      try {
          await createAcceptedEvent(event, application).then(res => {
              const updatedEvents = events.filter((e) => e.eventId !== event.eventId);
              console.log('Accepted Event', res);
              updatedEvents.push(res);
              setEvents(updatedEvents);
          });
          await getEvents();
      } catch (error) {
          console.log(error);
      }
  }

  const getUser = async () => {
    const userdetails = await Auth.currentUserInfo();
    console.log(userdetails);
    setUser(userdetails);
}

const getEvents = async () => {
  const eventsList = await fetchEvents();
  setEvents(eventsList);
}

   const handleSetUserType = async (attributes, picture) => {
    try{
      const updateUser = await Auth.currentAuthenticatedUser();
      const image = picture.split(',').pop();
      const userImage = await uploadUserImage(image, updateUser.username);
      console.log('userImage');
      const userAttributes = {
        ...attributes,
        'custom:user_image' : userImage,
      };
      const result = await Auth.updateUserAttributes(updateUser, userAttributes);
      console.log(result);
      await getUser();
    } catch (error) {
        console.log(error);
    }
  }

   const renderIndex = () => {
     if(user && user.attributes['custom:user_type']) {
       return (
         <div>
        <NavBar 
        user={user}
        openCreate={openCreate}
      />
        <ViewEvents
          user={user}
          events={events}
          handleAcceptApplication={handleAcceptApplication} 
          handleCreateApplication={handleCreateApplication}
        />
           <CreateEvent
            open={open}
            handleClose={closeCreate}
            onSubmit={handleCreateEvent}
            user={user}
            />
        </div>
       );
     }
     else if (user && !user.attributes['custom:user_type']) {
       return(
          <SetUser handleSetUserType={handleSetUserType}/>
      );
     }
    }

    const openCreate = () => setOpen(true);
    const closeCreate = () => setOpen(false);

    return(
   <AmplifyAuthenticator initialAuthState='signup' handleAuthStateChange={handleAuthChange}>
   {renderIndex()}
   </AmplifyAuthenticator>
   );
};

export default IndexPage;