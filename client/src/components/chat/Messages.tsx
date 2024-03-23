import React from 'react'

type MessagesProps = {
    message: string,
    messages: string[]
    setMessage : React.Dispatch<React.SetStateAction<string>>,
    onSendMessage: () => void
}

const Messages = ({message,setMessage,messages,onSendMessage}: MessagesProps) => {


  return (
    <div className="my-3 mx-3">
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="px-2 py-2 border-black border-2"
      name=""
      id=""
    />
    <button onClick={onSendMessage} className="px-2 py-2 rouded-lg bg-black text-white">Send</button>

    {
      messages.map((e,index) => {
        return <p key={index}>{e}</p>
      })
    }

  </div>
  )
}

export default Messages
