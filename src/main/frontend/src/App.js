import './css/App.css';
import './css/header.css'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ITDaRoutes from './routes/ITDaRoutes';
import LoginRoutes from "./routes/LoginRoutes";
import Footer from './components/Footer'
import Header from './components/Header'
import Alarm from './pages/Alarm/Alarm';

function App() {

  const location = useLocation();

  //socket 연결
  const [socket, setSocket] = useState();

  function connect(id) {
    let ws = new WebSocket(encodeURI("ws://localhost:8083/replyEcho/" + id))
    console.log(ws)
    setSocket(ws)
    ws.onopen = () => {
      console.log("websocket: connected")
      // ws.send("sending message from client-server")
    }
    ws.onclose = function (event) {
      console.log('Info: connection closed.');
      // setTimeout( function(){connect()}, 1000)
    };
    ws.onerror = function (event) { console.log('Info: connection closed.'); };
    setSocket(ws);
  }

  const [header, setHeader] = useState(<Header />)
  const url = useLocation()

  useEffect(() => {
    window.sessionStorage.getItem("loginId") !== null
      && setHeader(<Header socket={socket} />)
  }, [url])

  return window.sessionStorage.getItem("loginId") == null ? (
    <div className='T_mainTopDiv'>
      <LoginRoutes socket={socket} connect={connect} />
    </div>
  ) : (
    <div className='T_mainTopDiv'>
      {location.pathname !== "/consulting"
        && <Header connect={connect} socket={socket} setHeader={setHeader} />}
      {location.pathname !== "/consulting"
        && <Alarm connect={connect} socket={socket} />}
      <ITDaRoutes connect={connect} socket={socket} />
      {location.pathname !== "/consulting"
        && <Footer />}
    </div>
  );
}

export default App;
