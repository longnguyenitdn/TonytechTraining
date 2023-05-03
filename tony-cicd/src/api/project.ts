import { IProject } from "@/types/project.type";
import { myFetch } from "./myFetch";

const addProject = (project: IProject) => {
  const link = "/projects";
  const option = "POST";
  return myFetch(link, option, project);
};

const getProjectByUser = (userId: number) => {
  return myFetch(`/projects?ownerId=${userId}`, "GET");
};
export { addProject, getProjectByUser };
