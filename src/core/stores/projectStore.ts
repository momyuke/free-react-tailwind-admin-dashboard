import { ProjectStoreState } from "@/core/domain";

export const createProjectStore = (): ProjectStoreState => {
  return {
    projects: [],
    selectedProject: undefined,
  };
};
