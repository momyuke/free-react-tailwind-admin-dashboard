export interface IProject {
  clientId: string;
  cost: number;
  createdAt: string;
  createdBy: string;
  duration: number;
  id: string;
  isActive: number;
  mandays: number;
  status: string;
  type: string;
}

export const projectDefault: IProject = {
  clientId: "",
  cost: 0,
  createdAt: "",
  createdBy: "",
  duration: 0,
  id: "",
  isActive: 0,
  mandays: 0,
  status: "",
  type: "",
};

export enum EProjectType {
  SERVICES = "Services",
  ONE_TIME_PROJECT = "One Time Project",
  MAINTENANCE = "Maintenance",
}

export enum EProjectStatus {
  PITCHING = "Pitching",
  FOLLOW_UP = "Follow Up",
  ON_DEVELOPMENT = "On Development",
  INVOICING = "Invoicing",
  DONE = "Done",
}
