import React from 'react';
import { useAuthenticator} from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router';

class BaseLayout extends React.Component {
  LogInButtonComponent = () => {
    const { route, user, signOut } = useAuthenticator((context) => [context.route, context.user]);
    const navigate = useNavigate();

    if (route === "authenticated") {
        return (
        <div>
            <h1>Hey, {user.attributes.email}</h1>
            <button onClick={signOut}>Sign out</button>
          </div>
        );

    }
    else{
        return(
            <div>
                <button onClick={() => navigate("/Login")}>Sign in</button>
            </div>
        );
    }

  }

  render(){
    console.log("Calling render...");
    return (
        <div className="BaseLayout">
            <this.LogInButtonComponent></this.LogInButtonComponent>
        </div>
    );
  }
}

export default BaseLayout;