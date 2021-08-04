import { useState } from "react"

const OutputComponent = ({topic}) => {

    const [data, setData] = useState("");

    // Receiver [ ROS -> React ]

    topic.subscribe(function(message) {
        setData(data+"\n"+message.data);
    });

    return (
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
                value = {data}
              ></textarea>
            </div>
        </div>
    )
}

export default OutputComponent;