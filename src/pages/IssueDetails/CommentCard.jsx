import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { deleteComment } from "@/Redux/Comment/Action";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";

const CommentCard = ({ item }) => {
  const dispatch = useDispatch();

  // Handler for deleting a comment
  const handleDelete = () => {
    dispatch(deleteComment(item.id));
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <Avatar>
          {/* Fallback to first letter of the creator's name or "R" */}
          <AvatarFallback>{item.creatorName ? item.creatorName[0] : "R"}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          {/* Display the creator's name or fallback */}
          <p className="font-semibold text-gray-800">{item.creatorName || "Unknown User"}</p>
          {/* Display comment content */}
          <p className="text-gray-600">{item.content}</p>
        </div>
      </div>

      {/* Button to delete the comment */}
      <Button onClick={handleDelete} className="rounded-full" variant="ghost" size="icon" aria-label="Delete Comment">
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CommentCard;
