import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaPaperPlane } from "react-icons/fa";
import "./chatPanel.css";

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

interface Owner {
  name: string;
  isOnline: boolean;
}

const ChatPanelComponent = ({
  isOpen,
  isHovered,
  toggleChatPanel,
  handleMouseEnter,
  handleMouseLeave,
  owners,
}: {
  isOpen: boolean;
  isHovered: boolean;
  toggleChatPanel: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  owners: Owner[];
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages([
        ...messages,
        { sender: "You", message: newMessage, timestamp },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div>
      <div className="chatPanelContent">
        <div className="chatTtitleContainer">
          <p className="chatTitle">Chat</p>
        </div>

        <div className="messagesContainer">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "You" ? "sent" : "received"}`}
            >
              <span className="sender">{msg.sender}</span>
              <span className="timestamp">{msg.timestamp}</span>
              <div className="textContainer">
                <div className="text">{msg.message}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="inputContainer">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type message here..."
          />
          <button className="sendButton" onClick={handleSendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanelComponent;

/////////////////////////////

// import React, { useState, useEffect, useRef } from "react";
// import { FaArrowLeft, FaArrowRight, FaPaperPlane } from "react-icons/fa";
// import "./chatPanel.css";

// interface ChatMessage {
//   sender: string;
//   message: string;
//   timestamp: string;
// }

// interface Owner {
//   name: string;
//   isOnline: boolean;
// }

// const ChatPanelComponent = ({
//   isOpen,
//   isHovered,
//   toggleChatPanel,
//   handleMouseEnter,
//   handleMouseLeave,
//   owners,
// }: {
//   isOpen: boolean;
//   isHovered: boolean;
//   toggleChatPanel: () => void;
//   handleMouseEnter: () => void;
//   handleMouseLeave: () => void;
//   owners: Owner[];
// }) => {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (newMessage.trim() !== "") {
//       const timestamp = new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       setMessages([
//         ...messages,
//         { sender: "You", message: newMessage, timestamp },
//       ]);
//       setNewMessage("");
//     }
//   };

//   return (
//     <div>
//       <div className="chatPanelContent">
//         <div className="titleContainer">
//           <p className="chatTitle">Chat</p>
//         </div>
//         <div className="messagesContainer">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`message ${msg.sender === "You" ? "sent" : "received"}`}
//             >
//               <span className="sender">{msg.sender}</span>
//               <span className="timestamp">{msg.timestamp}</span>
//               <div className="textContainer">
//                 <div className="text">{msg.message}</div>
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>
//       <div className="inputContainer">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button className="sendButton" onClick={handleSendMessage}>
//           <FaPaperPlane />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatPanelComponent;
