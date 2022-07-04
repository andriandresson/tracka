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
    (step as StepWithSelectionArray).selected.length > 0 &&
    !!(step as StepWithSelectionArray).selected[0].id
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
