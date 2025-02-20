import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProjects, searchProjects, deleteProject } from "@/Redux/Project/Action";
import ProjectCard from "@/pages/Project/ProjectCard"; // Assuming this is the card component for each project

const ProjectList = () => {
  const dispatch = useDispatch();
  const { projects, searchProjects: searchedProjects, loading, error } = useSelector((state) => state.project);

  const [searchKeyword, setSearchKeyword] = useState("");

  // Fetch all projects on initial load
  useEffect(() => {
    dispatch(fetchProjects({}));
  }, [dispatch]);

  // Trigger the search action when the search keyword changes
  useEffect(() => {
    if (searchKeyword) {
      dispatch(searchProjects(searchKeyword)); // Fetch projects based on search keyword
    }
  }, [searchKeyword, dispatch]);

  // Projects to display: either search results or all projects
  const projectsToDisplay = searchKeyword ? searchedProjects : projects;

  // Delete project handler
  const handleDeleteProject = (projectId) => {
    dispatch(deleteProject(projectId)); // Dispatch the delete action
  };

  return (
    <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
      {/* Search Bar */}
      <div className="relative p-0 w-full lg:w-[20rem]">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="w-full px-9 py-2 border rounded"
        />
      </div>

      {/* Loading State */}
      {loading && <p>Loading projects...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projectsToDisplay && projectsToDisplay.length > 0 ? (
          projectsToDisplay.map((item) => (
            <ProjectCard key={item.id} item={item} onDelete={handleDeleteProject} />
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
