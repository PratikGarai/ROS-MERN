import { useRef } from 'react';
import ROSLIB from 'roslib';
import './App.css';

function App() {

  let IP = "192.168.43.248";
  let PORT = 9090;

  var ros = new ROSLIB.Ros({
    url : `ws://${IP}:${PORT}`
  });

  ros.on('connection', function() {
    console.log('Connected to ROS websocket server.');
  });

  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });

  var talker = new ROSLIB.Topic({
    ros : ros,
    name : '/chatter',
    messageType : 'std_msgs/String'
  });

  const message = useRef("");

  const onClick = () => {
    console.log(message.current.value);
    const messageObj = new ROSLIB.Message({
      data : message.current.value.toString()
    });

    talker.publish(messageObj);
  }

  return (
    <div className="App">
        <div style={{
          display : "flex",
          flexDirection : "column",
          alignItems : "center",
          justifyContent : "center"
        }}>
          <h2>Send messages here </h2>
          <div>
            <input type="text" ref={message} placeholder="Message..."/>
          </div>
          <div style={{
            marginTop : "10px"
          }}>
            <button onClick={onClick}>Send Message</button>
          </div>
        </div>
        <br />
        <hr />
    </div>
  );
}

export default App;
