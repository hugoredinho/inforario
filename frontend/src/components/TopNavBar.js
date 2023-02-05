import React from 'react';
import { useAuthenticator} from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router';

class TopNavBar extends React.Component {
  NavButtonsComponent = () => {
    const { route, user, signOut } = useAuthenticator((context) => [context.route, context.user]);
    const navigate = useNavigate();

    if (route === "authenticated") {
        return (
        <div>
            <h1>Hey, {user.attributes.preferred_username}</h1>
            <button onClick={signOut}>Sign out</button>
            <button onClick={()=> navigate("/Horario")}>Horarios</button>
        </div>

        );

    }
    else{
        return(
            <div>
                <button onClick={() => navigate("/Login")}>Sign in</button>
                <button onClick={()=> navigate("/Horario")}>Horarios</button>
            </div>
        );
    }

  }

  render(){
    console.log("Calling render...");
    return (
        <div className="BaseLayout">
            <this.NavButtonsComponent></this.NavButtonsComponent>
        </div>
        
    );
  }
}

export default TopNavBar;