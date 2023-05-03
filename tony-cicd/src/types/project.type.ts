export type IProject = {
  name: string;
  ownerId?: number;
  id?: number;
};
export interface IProjectState {
  projects?: IProject[];
}
