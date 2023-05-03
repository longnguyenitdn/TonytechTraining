import { IProjectState } from "@/types/project.type";
interface RootState {
  project: IProjectState;
}
export const projectsSelector = (state: RootState) => state.project.projects;
