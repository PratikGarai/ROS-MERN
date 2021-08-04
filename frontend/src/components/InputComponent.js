import { useState } from "react"

const InputComponent = ({sendMessage}) => {

    const [message, setMessage] = useState("");

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    const onClick = (e) => {
        sendMessage(message);
        setMessage("");
    }

    return (
        <div style={{
            display : "flex",
            flexDirection : "column",
            alignItems : "center",
            justifyContent : "center"
          }}>
            <h2>Send messages here </h2>
            <div>
                <input 
                    type="text" 
                    value={message} 
                    placeholder="Message..."
                    onChange={onChange}
                />
            </div>
            <div style={{
              marginTop : "10px"
            }}>
              <button onClick={onClick}>Send Message</button>
            </div>
        </div>
    )
}

export default InputComponent;