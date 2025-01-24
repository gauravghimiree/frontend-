import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";
import ChatBox from "./ChatBox";
import IssueList from "./IssueList";
import InviteUserForm from "./InviteUserForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProjectById } from "@/Redux/Project/Action";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { projectDetails, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id)); // Fetch project details by ID
    }
  }, [dispatch, id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="mt-5 lg:px-10">
      <div className="lg:flex gap-5 justify-between pb-4">
        {/* Project Details Section */}
        <ScrollArea className="h-screen lg:w-[69%] pr-2">
          <div className="text-gray-400 pb-10 w-full">
            <h1 className="text-lg font-semibold pb-5">{projectDetails?.name || "Project Name"}</h1>

            <div className="space-y-5 pb-10 text-sm">
              {/* Description */}
              <p className="w-full md:max-w-lg lg:max-w-xl">{projectDetails?.description || "No description available."}</p>

              {/* Project Lead */}
              <div className="flex">
                <p className="w-36">Project Lead:</p>
                <Badge>{projectDetails?.owner.fullName}</Badge>
              </div>

              {/* Team Members */}
              <div className="flex items-center">
                <p className="w-36">Team Members:</p>
                <div className="flex items-center gap-2">
                  {projectDetails?.team?.length > 0
                    ? projectDetails.team.map((member, index) => (
                        <div key={index} className="relative">
                          {/* Avatar with Tooltip on Hover */}
                          <Avatar className="cursor-pointer" title={member?.fullName || "No Name"}>
                            <AvatarFallback>
                              {member?.fullName?.charAt(0) || member?.email?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      ))
                    : "No team members yet."}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="ml-2">
                      <span>Invite</span>
                      <PlusIcon className="w-3 h-3 ml-1" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>Invite User</DialogHeader>
                    <InviteUserForm />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Category */}
              <div className="flex">
                <p className="w-36">Category:</p>
                <p>{projectDetails?.category || "N/A"}</p>
              </div>
            </div>

            {/* Tasks Section */}
            <section>
              <p className="py-5 border-b text-lg -tracking-wider">Tasks</p>
              <div className="lg:flex md:flex gap-3 justify-between py-5">
                <IssueList status="pending" title="Todo List" />
                <IssueList status="in_progress" title="In Progress" />
                <IssueList status="done" title="Done" />
              </div>
            </section>
          </div>
        </ScrollArea>

        {/* Chat Section */}
        <div className="lg:w-[30%] rounded-md sticky right-5 top-10">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
