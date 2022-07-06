import { DefaultUser, Session } from 'next-auth';

export interface Selection {
  name: string;
  id: string | number;
}

export interface Step {
  label: string;
  description?: string;
  selected?: Selection | Selection[];
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
