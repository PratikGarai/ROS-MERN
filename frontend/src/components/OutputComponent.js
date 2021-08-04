import { useRef } from "react"

const OutputComponent = ({topic}) => {

    const ref = useRef("");

    // Receiver [ ROS -> React ]

    topic.subscribe(function(message) {
	if(ref.current!=="")
	    ref.current.value += "\n"+message.data;
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
	    	ref = {ref}
              ></textarea>
            </div>
        </div>
    )
}

export default OutputComponent;
