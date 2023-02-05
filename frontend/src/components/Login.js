import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator, View } from "@aws-amplify/ui-react";
import { useEffect, React } from "react";
import { useNavigate, useLocation } from "react-router";
export function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (route === "authenticated") {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);
  
  //navigate(from, { replace: true });
  return (
    <View className="auth-wrapper">
      <Authenticator></Authenticator>
    </View>
  );
}
