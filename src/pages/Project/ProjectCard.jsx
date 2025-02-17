import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteProject } from "@/Redux/Project/Action";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProjectCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Loading state for deletion

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setLoading(true); // Start loading state
      try {
        await dispatch(deleteProject({ projectId: item.id }));
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete the project.");
      } finally {
        setLoading(false); // End loading state
      }
    }
  };

  return (
    <Card className="p-5 w-full lg:max-w-3xl bg-[#e0e0e0] hover:bg-[#f5f5f5] hover:text-[#2e2a72]">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <h1
                onClick={() => navigate(`/project/${item.id}`)}
                className="cursor-pointer font-bold text-lg"
              >
                {item.name || "Untitled Project"} {/* Fallback for project name */}
              </h1>
              <DotFilledIcon />
              <p className="text-sm text-gray-400">{item.category || "No category"}</p> {/* Fallback for category */}
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="rounded-full" variant="ghost" size="icon">
                    <DotsVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Update</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete} disabled={loading}>
                    {loading ? "Deleting..." : "Delete"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p>{item.description || "No description available"}</p> {/* Fallback for description */}
        </div>

        {/* Safely rendering tags with a fallback check */}
        <div className="flex flex-wrap gap-2 items-center">
          {item.tags && item.tags.length > 0 ? (
            item.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No tags available</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
