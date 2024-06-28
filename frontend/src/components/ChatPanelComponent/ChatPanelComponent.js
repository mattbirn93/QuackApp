import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaPaperPlane } from "react-icons/fa";
import "./chatPanel.css";
const ChatPanelComponent = ({ owners }) => {
    const [messages, setMessages] = useState(() => {
        const savedMessages = sessionStorage.getItem("chatMessages");
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const [isOpen, setIsOpen] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
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
            setMessages([
                ...messages,
                { sender: "You", message: newMessage, timestamp },
            ]);
            setNewMessage("");
        }
    };
    return (_jsxs("div", { className: `chatPanel ${isOpen || isHovered ? "open" : "collapsed"}`, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [_jsx("div", { className: "toggleButtonContainer2", children: _jsx("button", { className: "toggleButton2", onClick: toggleChatPanel, children: isOpen ? _jsx(FaArrowRight, {}) : _jsx(FaArrowLeft, {}) }) }), (isOpen || isHovered) && (_jsxs("div", { className: "chatPanelContent", children: [_jsx("div", { className: "chatTitleContainer", children: _jsx("p", { className: "chatTitle", children: "Chat" }) }), _jsx("div", { className: "chatContainer", children: _jsxs("div", { className: "messagesContainer", children: [messages.map((msg, index) => (_jsxs("div", { className: `message ${msg.sender === "You" ? "sent" : "received"}`, children: [_jsx("span", { className: "sender", children: msg.sender }), _jsx("span", { className: "timestamp", children: msg.timestamp }), _jsx("div", { className: "textContainer", children: _jsx("div", { className: "text", children: msg.message }) })] }, index))), _jsx("div", { ref: messagesEndRef })] }) }), _jsxs("div", { className: "inputContainer", children: [_jsx("textarea", { value: newMessage, onChange: (e) => setNewMessage(e.target.value), placeholder: "Type message here..." }), _jsx("button", { className: "sendButton", onClick: handleSendMessage, children: _jsx(FaPaperPlane, {}) })] })] }))] }));
};
export default ChatPanelComponent;
