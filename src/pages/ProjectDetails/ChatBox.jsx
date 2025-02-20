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
  const [isExpanded, setIsExpanded] = useState(false); // State to control width
  const { auth, chat } = useSelector((store) => store); // Ensure your store has these states
  const dispatch = useDispatch();
  const { id: projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      dispatch(fetchChatMessages(projectId));
    }
  }, [dispatch, projectId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(
        sendMessage({
          senderId: auth?.user?.id,
          projectId,
          content: message,
        })
      );
      setMessage("");
    }
  };

  const handleExpandChat = () => {
    setIsExpanded(true);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const dateObj = new Date(timestamp);
    const today = new Date();
    const isToday =
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear();

    return isToday
      ? dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : dateObj.toLocaleString();
  };

  return (
    <div className="sticky top-0">
      {/* Dynamic width change */}
      <div
        className={`border rounded-lg shadow-lg mx-auto transition-all duration-300 ${
          isExpanded ? "w-full" : "w-[100%]"
        }`}
        onClick={handleExpandChat} // Expands when clicked
      >
        <h1 className="border-b p-5 text-xl font-semibold">Chat</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex flex-col gap-3">
          {chat?.messages?.length > 0 ? (
            chat.messages.map((msg) => {
              const isOwnMessage = msg.senderId === auth?.user?.id;
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Avatar for messages from other users */}
                  {!isOwnMessage && (
                    <Avatar>
                      <AvatarFallback>
                        {msg.senderName?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col max-w-xs">
                    {/* Display sender name for messages from others */}
                    {!isOwnMessage && (
                      <span className="text-sm text-gray-600">
                        {msg.senderName || "Anonymous"}
                      </span>
                    )}
                    <div
                      className={`px-4 py-2 rounded-xl break-words ${
                        isOwnMessage
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-black border"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-xs text-gray-500 mt-1 self-end">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                  {/* Avatar for messages from logged-in user */}
                  {isOwnMessage && (
                    <Avatar>
                      <AvatarFallback>
                        {auth?.user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No messages yet.</p>
          )}
        </ScrollArea>

        <div className="flex items-center p-5 border-t">
          <Input
            placeholder="Type a message..."
            className="py-3 px-4 flex-1 border-2 rounded-l-lg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            onClick={handleSendMessage}
            className="ml-2 rounded-full bg-blue-500 text-white"
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
