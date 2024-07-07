import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaPaperPlane } from "react-icons/fa";
import io from "socket.io-client";
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

const ChatPanelComponent = ({ owners }: { owners: Owner[] }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const savedMessages = sessionStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState<string>(() => {
    const savedUser = localStorage.getItem("chatUser");
    return savedUser || "";
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const socket = useRef<SocketIOClient.Socket | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!user) {
      const userName = prompt("Enter your name:");
      if (userName) {
        setUser(userName);
        localStorage.setItem("chatUser", userName);
      }
    }

    console.log(`Connecting to WebSocket at ${API_BASE_URL}`);
    socket.current = io(API_BASE_URL);

    socket.current.on("connect", () => {
      console.log("WebSocket connected");
    });

    socket.current.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    socket.current.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    socket.current.on("chatMessage", (msg: ChatMessage) => {
      console.log("Message received:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      console.log("Disconnecting WebSocket");
      socket.current?.disconnect();
    };
  }, [API_BASE_URL, user]);

  const toggleChatPanel = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    if (!isOpen) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isOpen) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const message: ChatMessage = {
        sender: user,
        message: newMessage,
        timestamp,
      };
      console.log("Sending message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);

      if (socket.current) {
        socket.current.emit("chatMessage", message);
      }

      setNewMessage("");
    }
  };

  return (
    <div
      className={`chatPanel ${isOpen || isHovered ? "open" : "collapsed"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="toggleButtonContainer2">
        <button className="toggleButton2" onClick={toggleChatPanel}>
          {isOpen ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
      </div>
      {(isOpen || isHovered) && (
        <div className="chatPanelContent">
          <div className="chatTitleContainer">
            <p className="chatTitle">Chat</p>
          </div>
          <div className="chatContainer">
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
      )}
    </div>
  );
};

export default ChatPanelComponent;

///////////////

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

// const ChatPanelComponent = ({ owners }: { owners: Owner[] }) => {
//   const [messages, setMessages] = useState<ChatMessage[]>(() => {
//     const savedMessages = sessionStorage.getItem("chatMessages");
//     return savedMessages ? JSON.parse(savedMessages) : [];
//   });
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [isOpen, setIsOpen] = useState(true);
//   const [isHovered, setIsHovered] = useState(false);

//   const toggleChatPanel = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleMouseEnter = () => {
//     if (!isOpen) {
//       setIsHovered(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (!isOpen) {
//       setIsHovered(false);
//     }
//   };

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   useEffect(() => {
//     sessionStorage.setItem("chatMessages", JSON.stringify(messages));
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
//     <div
//       className={`chatPanel ${isOpen || isHovered ? "open" : "collapsed"}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div className="toggleButtonContainer2">
//         <button className="toggleButton2" onClick={toggleChatPanel}>
//           {isOpen ? <FaArrowRight /> : <FaArrowLeft />}
//         </button>
//       </div>
//       {(isOpen || isHovered) && (
//         <div className="chatPanelContent">
//           <div className="chatTitleContainer">
//             <p className="chatTitle">Chat</p>
//           </div>
//           <div className="chatContainer">
//             <div className="messagesContainer">
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`message ${msg.sender === "You" ? "sent" : "received"}`}
//                 >
//                   <span className="sender">{msg.sender}</span>
//                   <span className="timestamp">{msg.timestamp}</span>
//                   <div className="textContainer">
//                     <div className="text">{msg.message}</div>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
//           </div>

//           <div className="inputContainer">
//             <textarea
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type message here..."
//             />
//             <button className="sendButton" onClick={handleSendMessage}>
//               <FaPaperPlane />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPanelComponent;
