// import logo from './logo.svg';
import BotWidget from './components/bot-widget';
import './App.scss';
import { useEffect, useState } from 'react';
import { AxiosService } from './services/AxiosService';
import { CONSTANTS } from './constants';

// Bootstrapping APP component to login and set the user token.
function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem('insent-token'));

  function loginUser() {
    const axiosServ = new AxiosService();
    axiosServ.loginUser({
      email: CONSTANTS.USER_CREDENTIALS.EMAIL,
      password: CONSTANTS.USER_CREDENTIALS.PASSWORD
    }).then(res => {
      if (res.data.token) {
        setUserToken(res.data.token);
        localStorage.setItem('insent-token', res.data.token)
      }
    });
  }

  useEffect(() => {
    if (!userToken) {
      loginUser();
    }
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="text-center">
          Custom Insent.ai Bot
        </h1>
      </header>
      {userToken && 
        <BotWidget />
      }
    </div>
  );
}

export default App;
