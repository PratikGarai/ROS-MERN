const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongoose has connected successfully!')
});

const RosSchema = new mongoose.Schema({
    message: String
});
const RosModel = mongoose.model('ROS', RosSchema);

function listener() {
    rosnodejs.initNode('/listener_node')
    .then((rosNode) => {
        let sub = rosNode.subscribe('/roschatter', std_msgs.String,
            (data) => { 
                rosnodejs.log.info('I heard: [' + data.data + ']');
                
                const rosdata = new RosModel({message : data.data})
                rosdata.save(function (err, rosdata) {
                    if (err) return console.error(err);
                    else console.log('saved!')
                });
            }
        );
    });
}

if (require.main === module) {
    listener();
}
