import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssueById, updateIssueStatus } from "@/Redux/Issue/Action";
import { fetchComments } from "@/Redux/Comment/Action";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();
  const dispatch = useDispatch();
  const { issue, comment } = useSelector((store) => store);

  const handleUpdateIssueStatus = (status) => {
    dispatch(updateIssueStatus(issueId, status)); // Pass id and status correctly
    console.log(status);
  };

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchComments(issueId));
  }, [issueId, dispatch]);

  return (
    <div className="px-6 py-8 lg:px-20 lg:py-12">
      <div className="flex flex-col lg:flex-row gap-8 border p-6 rounded-lg shadow-lg">
        {/* Left Section */}
        <ScrollArea className="h-[80vh] lg:w-[60%]">
          <div>
            <h1 className="text-xl font-bold text-gray-800">{issue.issueDetails?.title || "Issue Title"}</h1>

            <div className="py-5">
              <h2 className="font-semibold text-gray-800">Description</h2>
              <p className="text-gray-700 text-sm mt-3">
                {issue.issueDetails?.description || "No description available."}
              </p>
            </div>

            {/* Activity Section */}
            <div className="mt-5">
              <h1 className="pb-3 text-lg font-semibold text-gray-800">Activity</h1>
              <Tabs defaultValue="comments" className="w-full">
                <TabsList className="mb-5">
                  <TabsTrigger value="all" className="px-4 py-2">All</TabsTrigger>
                  <TabsTrigger value="comments" className="px-4 py-2">Comments</TabsTrigger>
                  <TabsTrigger value="history" className="px-4 py-2">History</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <p className="text-gray-600">All activity related to this issue will appear here.</p>
                </TabsContent>

                <TabsContent value="comments">
                  <CreateCommentForm issueId={issueId} />
                  <div className="mt-8 space-y-6">
                    {comment.comments.map((item, index) => (
                      <CommentCard item={item} key={index} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <p className="text-gray-600">All history related to this issue will appear here.</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>

        {/* Right Section */}
        <div className="lg:w-[35%] space-y-6">
          {/* Status Selector */}
          <Select onValueChange={handleUpdateIssueStatus}>
            <SelectTrigger className="w-full lg:w-[250px]">
              <SelectValue placeholder="To Do" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>

          {/* Details Section */}
          <div className="border rounded-lg shadow-lg">
            <p className="border-b py-3 px-5 text-gray-800 font-semibold">Details</p>
            <div className="p-5">
              <div className="space-y-6">
                {/* Assignee */}
                <div className="flex gap-6 items-center">
                  <p className="w-[7rem] text-gray-700">Assignee</p>
                  {issue.issueDetails?.assignee?.fullName ? (
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 text-xs">
                        <AvatarFallback>{issue.issueDetails?.assignee?.fullName[0]}</AvatarFallback>
                      </Avatar>
                      <p className="text-gray-800">{issue.issueDetails?.assignee?.fullName}</p>
                    </div>
                  ) : (
                    <p className="text-gray-600">Unassigned</p>
                  )}
                </div>

                {/* Labels */}
                <div className="flex gap-6 items-center">
                  <p className="w-[7rem] text-gray-700">Labels</p>
                  <p className="text-gray-600">None</p>
                </div>

                {/* Status */}
                <div className="flex gap-6 items-center">
                  <p className="w-[7rem] text-gray-700">Status</p>
                  <Badge className="bg-blue-100 text-blue-700">
                    {issue.issueDetails?.status || "Unknown"}
                  </Badge>
                </div>

                {/* Release */}
                <div className="flex gap-6 items-center">
                  <p className="w-[7rem] text-gray-700">Release</p>
                  <p className="text-gray-600">--</p>
                </div>

                {/* Reporter */}
                <div className="flex gap-6 items-center">
                  <p className="w-[7rem] text-gray-700">Reporter</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 text-xs">
                      <AvatarFallback />
                    </Avatar>
                    <p className="text-gray-800">Shyam</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
