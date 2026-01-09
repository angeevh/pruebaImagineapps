
export type ProjectStatus = 'Planning' | 'Active' | 'Completed' | 'Cancelled';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Blocked';

export interface IUser {
  id: number;
  displayName: string;
  email?: string;
}

export interface IProject {
  id: number;
  code: string;            
  name: string;            
  manager?: IUser;         
  budget?: number;         
  startDate?: string;      
  endDate?: string;        
  status: ProjectStatus;   
  priority?: Priority;     
  totalTasks: number;
  completedTasks: number;
  blockedTasks: number;
  progressPct: number;     
}

export interface ITask {
  id: number;
  title: string;           
  relatedProjectId: number;
  assignedTo?: IUser;      
  estimatedHours?: number; 
  percentComplete: number; 
  status: TaskStatus;      
}

