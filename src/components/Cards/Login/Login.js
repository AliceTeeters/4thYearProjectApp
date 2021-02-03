import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react';

function Login(){

  return (
    <AmplifyAuthenticator>
  <AmplifySignIn
    headerText="My Custom Sign In Text"
    slot="sign-in"
  ></AmplifySignIn>
  <AmplifySignUp
    headerText="My Custom Sign Up Text"
    slot="sign-up"
  ></AmplifySignUp>
</AmplifyAuthenticator>

  );
}

export default Login;