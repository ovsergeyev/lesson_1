import React, {lazy, useState, useEffect, Suspense} from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main.jsx";
import Footer from "./Footer";
import ProtectedRoute from './ProtectedRoute';

const Login = lazy(() => import('auth/Login').catch(()=>{
  return {
    default: () => <div>Не удалось загрузить компонент login</div>
  }
}));

const Register = lazy(() => import('auth/Register').catch(()=>{
  return {
    default: () => <div>Не удалось загрузить компонент register</div>
  }
}));

const AuthListener = lazy(() => import('auth/AuthListener').catch(()=>{
  return {
    default: () => <div>Не удалось загрузить компонент AuthListener</div>
  }
}));

const onSignOut = () => {
  dispatchEvent(new CustomEvent('logout'));
}

const App = () => {
  const history = useHistory();
  const [jwt, setJwt] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = useState("");

  const handleJwtChange = event => {
    const {email, isLoggedIn} = event.detail;
    setEmail(email);
    setIsLoggedIn(isLoggedIn);
    history.push('/');
  };

  const handleSuccessRegistration = event => {
    const {email, isLoggedIn} = event.detail;
    setEmail(email);
    setIsLoggedIn(isLoggedIn);
    history.push('/');
  };

  useEffect(() => {
    addEventListener('jwt-change', handleJwtChange);
    return () => removeEventListener('jwt-change', handleJwtChange);
  });

  useEffect(() => {
    addEventListener('success-registration', handleSuccessRegistration);
    return () => removeEventListener('success-registration', handleSuccessRegistration)
  });

  return (
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={isLoggedIn}
          />
          {/* <Route exact path="/">
            <div style={{color: 'white'}}>Main Page</div>
          </Route> */}
          <Route path="/signup">
            <Suspense>
              <Register />
            </Suspense>
          </Route>
          <Route path="/signin">
            <Suspense>
              <Login />
            </Suspense>
          </Route>
        </Switch>

        <Footer />

        <AuthListener />
      </div>
  );
};

export default App;
// const rootElement = document.getElementById("root")
// if (!rootElement) throw new Error("Failed to find the root element")

// const root = ReactDOM.createRoot(rootElement)

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <div className="page__content">
//         <App />
//       </div>
//     </BrowserRouter>
//   </React.StrictMode>
// )