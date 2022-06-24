export interface Selection {
  name: string;
  id: string | number;
}

export interface Step {
  label: string;
  description?: string;
  selected?: Selection | Selection[];
}
