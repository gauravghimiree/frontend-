import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendMessage, fetchChatMessages } from "@/Redux/Chat/Action";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const { auth, chat } = useSelector((store) => store); // Access auth and chat states
  const dispatch = useDispatch();
  const { id: projectId } = useParams(); // Destructure and rename for clarity

  // Fetch messages on component mount
  useEffect(() => {
    if (projectId) {
      dispatch(fetchChatMessages(projectId)); // Fetch chat messages from backend
    }
  }, [dispatch, projectId]);

  // Handle message sending
  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(
        sendMessage({
          senderId: auth.user?.id,
          projectId,
          content: message,
        })
      );
      setMessage(""); // Clear the input field after sending
    }
  };

  // Handle input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {/* Render chat messages */}
          {chat.messages?.map((msg) => (
            <div
              className={`flex gap-2 mb-2 ${
                msg.senderId === auth.user?.id ? "justify-end" : "justify-start"
              }`}
              key={msg.id}
            >
              {msg.senderId !== auth.user?.id && (
  <Avatar>
    <AvatarFallback>
      {msg.senderName?.charAt(0)?.toUpperCase() || "U"}
    </AvatarFallback>
  </Avatar>
)}
              <div
                className={`space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl ${
                  msg.senderId === auth.user?.id
                    ? "bg-blue-100 text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                <p className="font-bold">{auth.user?.fullName}</p>
                <p className="text-gray-700">{msg.content}</p>
              </div>
              {msg.senderId === auth.user?.id && (
                <Avatar>
                  <AvatarFallback>
                    {auth.user?.fullName.charAt(0) }
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>

        <div className="relative p-0">
          <Input
            placeholder="Type a message..."
            className="py-7 border-t outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
            value={message}
            onChange={handleMessageChange}
          />
          <Button
            onClick={handleSendMessage}
            className="absolute right-2 top-3 rounded-full"
            size="icon"
            variant="ghost"
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
