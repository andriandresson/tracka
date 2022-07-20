import { DefaultUser, Session } from 'next-auth';

export interface Selection {
  name: string;
  id: string | number;
}

interface BasicStep {
  label: string;
  description?: string;
}
interface StepWithSelection extends BasicStep {
  selected?: Selection;
}
interface StepWithSelectionArray extends BasicStep {
  selected: Selection[];
}
interface StepWithStringArray extends BasicStep {
  selected: string[];
}

export type Step =
  | StepWithSelection
  | StepWithSelectionArray
  | StepWithStringArray;

export const isStepWithSelection = (step: Step): step is StepWithSelection => {
  return !!(step as StepWithSelection).selected?.id;
};

export const isStepWithSelectionArray = (
  step: Step
): step is StepWithSelectionArray => {
  return (
    !!Array.isArray((step as StepWithSelectionArray).selected) &&
    ((step as StepWithSelectionArray).selected.length > 0
      ? !!(step as StepWithSelectionArray).selected[0].id
      : true)
  );
};

export type MaybeObjectOrBoolean = {
  [key: string]: MaybeObjectOrBoolean | boolean;
};

export interface Space {
  id: string;
  name: string;
}

export interface Status {
  id: string;
  status: string;
  type: string;
  orderindex: number;
  color: string;
}

export interface Status2 {
  status: string;
  color: string;
  hide_label: boolean;
}

export interface Space2 {
  id: string;
  name: string;
  access: boolean;
}

export interface Status3 {
  id: string;
  status: string;
  orderindex: number;
  color: string;
  type: string;
}

export interface List {
  id: string;
  name: string;
  orderindex: number;
  status: Status2;
  priority?: any;
  assignee?: any;
  task_count: number;
  due_date?: any;
  start_date?: any;
  space: Space2;
  archived: boolean;
  override_statuses: boolean;
  statuses: Status3[];
  permission_level: string;
  content: string;
}

export interface Folder {
  id: string;
  name: string;
  orderindex: number;
  override_statuses: boolean;
  hidden: boolean;
  space: Space;
  task_count: string;
  archived: boolean;
  statuses: Status[];
  lists: List[];
  permission_level: string;
}

export interface RootObject {
  folders: Folder[];
}

export interface CustomerSelection {
  [key: string]: {
    [key: string]: {
      [key: string]: boolean;
    };
  };
}

export interface ExtendedUserSession extends DefaultUser {
  apiToken: string;
  refreshToken: string;
  oAuthToken: string;
  defaultTeam: string;
  username: string;
  color?: string;
  initials?: string;
  profilePicture?: string;
}

export interface ExtendedSession extends Session {
  user: ExtendedUserSession;
}

export interface TimeTrackerStatus {
  status: string;
  color: string;
  type: string;
  orderindex: number;
}

export interface Task {
  id: string;
  name: string;
  status: TimeTrackerStatus;
  custom_type?: any;
}

export interface User {
  id: number;
  username: string;
  email: string;
  color: string;
  initials: string;
  profilePicture?: string;
}

export interface TaskLocation {
  list_id: string;
  folder_id: string;
  space_id: string;
}
export interface TaskTag {
  name: string;
  tag_fg: string;
  tag_bg: string;
  creator: number;
}

export interface EmployeeData {
  id: string;
  task: Task;
  wid: string;
  user: User;
  billable: boolean;
  start: string;
  end: string;
  duration: string;
  description: string;
  tags: any[];
  source: string;
  at: string;
  task_location: TaskLocation;
  task_tags: TaskTag[];
  task_url: string;
}
////////////////

export interface TeamMember {
  id: number;
  username: string;
  email: string;
  color: string;
  profilePicture: string;
  initials: string;
  role: number;
  custom_role?: any;
  last_active: string;
  date_joined: string;
  date_invited: string;
}

export interface InvitedBy {
  id: number;
  username: string;
  color: string;
  email: string;
  initials: string;
  profilePicture?: any;
}

export interface Member {
  user: TeamMember;
  invited_by: InvitedBy;
}

export interface Team {
  id: string;
  name: string;
  color: string;
  avatar: string;
  members: Member[];
}

export interface TeamsArray {
  data: {
    teams: Team[];
  };
}
