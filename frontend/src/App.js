import { useRef } from 'react';
import ROSLIB from 'roslib';
import './App.css';
import InputComponent from './components/InputComponent';

function App() {

  let IP = "192.168.43.248";
  let PORT = 9090;
  const messageReceived = useRef("");

  // ROS setup

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

  // Topis setup

  var chatter = new ROSLIB.Topic({
    ros : ros,
    name : '/chatter',
    messageType : 'std_msgs/String'
  });

  // Sender [ React -> ROS ]

  const sendMessage = (message) => {
    const messageObj = new ROSLIB.Message({
      data : message
    });

    chatter.publish(messageObj);
  }

  // Receiver [ ROS -> React ]

  chatter.subscribe(function(message) {
    console.log("Receiver : ", message.data);
  });

  return (
    <div className="App">
        <InputComponent sendMessage={sendMessage} />
        <br />
        <hr />
        <div style={{
          display : "flex", 
          padding : "20px",
          flexDirection : "column",
          alignItems : "center",
          justifyContent : "center"
        }}>
          <h2>Listener</h2>
          <div>
            <textarea 
              contentEditable={false}
              rows = {10}
              cols = {60}
              ref = {messageReceived}
            ></textarea>
          </div>
        </div>
    </div>
  );
}

export default App;
