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

  return (
    <div className="App">

    </div>
  );
}

export default App;
