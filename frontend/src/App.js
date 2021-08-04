import ROSLIB from 'roslib';
import './App.css';
import InputComponent from './components/InputComponent';
import OutputComponent from './components/OutputComponent';

function App() {

  let IP = "192.168.43.248";
  let PORT = 9090;

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

  // Topic setup
  
  var chatter = new ROSLIB.Topic({
    ros : ros,
    name : '/chatter',
    messageType : 'std_msgs/String'
  });

  return (
    <div className="App">
        <InputComponent topic={chatter} />
        <br />
        <hr />
        <OutputComponent topic={chatter} />
    </div>
  );
}

export default App;
