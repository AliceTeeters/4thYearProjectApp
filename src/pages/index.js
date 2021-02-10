/* eslint react/prop-types: 0 */
import Amplify, {Auth} from "aws-amplify";
import React, {useEffect, useState} from "react"
import awsExports from "../aws-exports";
import ViewEvents from '../components/View/Events/Events';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import SetUser from "../components/Cards/SetUser/SetUser";
// import AmplifyTheme from '../misc/AmplifyTheme';

Amplify.configure(awsExports);

const IndexPage = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const userdetails = await Auth.currentUserInfo();
      console.log('User:', userdetails);
      setUser(userdetails);
  }
  
    getUser();
    console.log('User:', user);
  }, []);

  const getUser = async () => {
    const userdetails = await Auth.currentUserInfo();
    console.log(userdetails);
    setUser(userdetails);
}

   const handleSetUserType = async (attributes) => {
    try{
      const updateUser = await Auth.currentAuthenticatedUser();
      const result = await Auth.updateUserAttributes(updateUser, attributes);
      console.log(result);
      await getUser();
    } catch (error) {
        console.log(error);
    }
  }

   const renderIndex = () => {
     if(user && user.attributes['custom:user_type']) {
       return (
        <ViewEvents user={user}/>
       );
     }
     else if (user && !user.attributes['custom:user_type']) {
       return(
          <SetUser handleSetUserType={handleSetUserType}/>
      );
     }
    }

    return(
   <AmplifyAuthenticator initialAuthState='signup' handleAuthStateChange={getUser}>
   <AmplifySignOut/>
   {renderIndex()}
   </AmplifyAuthenticator>
   );
};

export default IndexPage;