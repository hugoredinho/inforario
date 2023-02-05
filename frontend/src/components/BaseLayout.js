import React from 'react';
import { useAuthenticator} from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router';
import TopNavBar from './TopNavBar';

class BaseLayout extends React.Component {

  render(){
    console.log("Calling render...");
    return (
        <div className="BaseLayout">
            <TopNavBar></TopNavBar>
        </div>
    );
  }
}

export default BaseLayout;