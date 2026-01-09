import { IProject, IUser, ProjectStatus } from '../models/types';
export interface UseProjectsOptions {
    projectsListTitle: string;
    tasksListTitle: string;
}
export interface UseProjectsState {
    projects: IProject[];
    loading: boolean;
    error?: string;
}
export declare const useProjects: (opts: UseProjectsOptions) => {
    reload: () => Promise<void>;
    managers: IUser[];
    statuses: ProjectStatus[];
    projects: IProject[];
    loading: boolean;
    error?: string;
};
//# sourceMappingURL=useProjects.d.ts.map