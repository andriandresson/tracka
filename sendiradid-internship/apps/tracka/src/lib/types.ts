export interface D {
  count: number;
  lastShown: number;
}

export interface S {
  count: number;
  lastShown: number;
}

export interface Popover {
  d: D;
  s: S;
}

export interface TourCardsData {
  popover: Popover;
}

export interface OnboardingData {
  teamId: string;
  imports: any[];
  integrations: any[];
  onboard_type: string;
}

export interface TourCards {
  create_task_tour_completed: boolean;
  multitask_tour_completed: boolean;
  notifications_tour_completed: boolean;
  view_task_tour_completed: boolean;
  category_tour_completed?: any;
  list_select_tour_completed?: any;
  comment_tour_completed?: any;
  minimize_tour_completed?: any;
  used_slash_commands?: any;
}

export interface Sso {
  sso_requirement_violated: boolean;
  policies: any[];
}

export interface Features {
  harvest?: any;
  toggl_check: boolean;
}

export interface TwofaOptions {
  text_enabled: boolean;
  totp_enabled: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  hmac: string;
  phone?: any;
  color: string;
  initials: string;
  date_joined: string;
  profilePicture?: any;
  gh_authed: boolean;
  demo_data_done: boolean;
  tour_cards_done: boolean;
  tour_cards_data: TourCardsData;
  onboarding_step: string;
  android_onboarding_done: boolean;
  default_team: string;
  default_project?: any;
  default_category?: any;
  default_subcategory?: any;
  twenty_four_hr_setting?: any;
  week_start_day?: any;
  show_coverimages: boolean;
  reverse_statuses?: any;
  post_with_cmd?: any;
  date_format?: any;
  theme_color: string;
  density: number;
  hotkeys: boolean;
  dont_add_harvest_task_ids?: any;
  scratchpad: boolean;
  dark_theme: boolean;
  contrast: number;
  block_tz_change_modal?: any;
  markdown_shortcuts: boolean;
  dropbox_enabled: boolean;
  drive_enabled: boolean;
  one_drive_enabled: boolean;
  box_enabled: boolean;
  pop_up_preference: number;
  onboarding_incentive_accepted: boolean;
  seen_time_estimate_warning: boolean;
  onboarding_video_steps?: any;
  onboarding_opt_out: boolean;
  show_celebrations: boolean;
  has_seen_mobile_onboarding: boolean;
  rtl_mode: boolean;
  dashboard_size: number;
  bouncing: boolean;
  onboarding_data: OnboardingData;
  hide_breadcrumbs_when_sorting?: any;
  tour_cards: TourCards;
  timezone_offset: string;
  timezone: string;
  sso: Sso;
  features: Features;
  imports_in_progress: any[];
  global_font_support: boolean;
  skipCaptcha: boolean;
  last_2fa_prompt?: any;
  twofa_enabled: string;
  twofa_required: boolean;
  twofa_options: TwofaOptions;
  require_2fa_count: number;
  extended_logging: boolean;
  fp_auth_token?: any;
  inbox_breadcrumbs?: any;
  dashboard: number;
  sidebar_theme?: any;
  bl: boolean;
  onboarding_bonus_claimed: boolean;
  gh_auth_team_ids: any[];
}

export interface Owner {
  id: number;
  username: string;
  email: string;
  color: string;
  initials: string;
  profilePicture?: any;
}

export interface Fields {
  gh_commit: boolean;
}

export interface NotificationSettings {
  receive_emails: boolean;
  new_task_notifs: number;
  fields: Fields;
}

export interface Internal {
  count: number;
  limit: number;
  limit_reached: boolean;
}

export interface Automation {
  internal: Internal;
}

export interface TeamStuff {
  id: string;
  team_name: string;
  tasks_bytes: number;
  docs_bytes: number;
  bytes: number;
}

export interface Projects {
  [key: string]: TeamStuff;
}

export interface StorageUsed {
  bytes: number;
  docs_bytes: number;
  tasks_bytes: number;
  comments_bytes: number;
  projects: Projects;
}

export interface Visible {
  due_date: boolean;
  start_date: boolean;
  date_created: boolean;
  date_updated: boolean;
  priority: boolean;
  assignees: boolean;
  task_id: boolean;
  time_spent: boolean;
}

export interface ListViewSettings {
  visible: Visible;
  sorting: any[];
}

export interface ProfileInfo {
  display_profile?: any;
  verified_ambassador?: any;
  verified_consultant?: any;
  top_tier_user?: any;
  viewed_verified_ambassador?: any;
  viewed_verified_consultant?: any;
  viewed_top_tier_user?: any;
}

export interface User2 {
  id: number;
  username: string;
  email: string;
  color: string;
  initials: string;
  profilePicture?: any;
  profileInfo: ProfileInfo;
}

export interface RolePermissions {
  name: string;
  team_role: number;
  public_spaces_visible: boolean;
  can_create_spaces: boolean;
  can_create_projects: boolean;
  can_create_lists: boolean;
  can_edit_privacy: number;
  can_see_team_members: boolean;
  can_add_team_members: boolean;
  can_edit_team_members: boolean;
  can_edit_team_owner: boolean;
  can_edit_team: boolean;
  can_edit_space_settings: number;
  can_edit_project_settings: number;
  share: boolean;
  can_delete_comments: boolean;
  can_gdpr_export: boolean;
  can_export_tasks: boolean;
  can_import: boolean;
  can_edit_integrations: boolean;
  can_delete_no_access: boolean;
  manage_tags: boolean;
  manage_statuses: boolean;
  billing: boolean;
  oauth_apps: boolean;
  can_add_team_guests: boolean;
  can_view_reporting: boolean;
  can_create_goals: boolean;
  can_create_portfolios: boolean;
  can_edit_list_statuses: boolean;
  can_enable_sso: boolean;
  can_edit_description: boolean;
  profile: boolean;
  can_edit_trial: boolean;
  can_edit_view_protection: boolean;
  can_list_inaccessible_spaces: boolean;
  can_recover_inaccessible_spaces: boolean;
  create_dashboards: boolean;
  create_automation: boolean;
  make_views_public: boolean;
  can_edit_user_groups: boolean;
  can_be_added_to_user_groups: boolean;
  can_see_workload: boolean;
  can_create_workload: boolean;
  can_use_git: boolean;
  custom_roles: boolean;
  team_permissions: boolean;
  add_email_account: boolean;
  manage_custom_fields: boolean;
  send_email: boolean;
  manage_custom_items: boolean;
  can_convert_item: boolean;
  can_create_milestone: boolean;
}

export interface Member {
  user: User2;
  twofa_enabled: string;
  twofa_totp_enabled: boolean;
  twofa_text_enabled: boolean;
  invite: boolean;
  role: number;
  role_permissions: RolePermissions;
  last_active: string;
  date_joined: string;
  date_invited: string;
  auto_send_invoices: boolean;
  can_see_time_spent?: any;
  can_see_time_estimated?: any;
  can_see_points_estimated?: any;
  can_create_views: boolean;
  can_edit_tags: boolean;
  custom_role?: any;
}

export interface Owner2 {
  id: number;
  username: string;
  email: string;
  color: string;
  initials: string;
  profilePicture?: any;
}

export interface Owner3 {
  id: number;
  username: string;
  email: string;
  color: string;
  initials: string;
  profilePicture?: any;
}

export interface Team2 {
  id: string;
  owner: Owner3;
  using_github: boolean;
  using_gitlab?: any;
  using_bitbucket?: any;
  name: string;
  date_created: string;
  avatar?: any;
}

export interface Permissions {
  name: string;
  can_read: boolean;
  change_status: boolean;
  change_assignee: number;
  change_due_date: boolean;
  change_title: boolean;
  change_description: boolean;
  change_priority: boolean;
  change_incoming_address: boolean;
  edit_list_details: boolean;
  add_tags: boolean;
  remove_tags: boolean;
  add_subtasks: boolean;
  add_checklists: boolean;
  edit_checklists: boolean;
  can_resolve_checklist_item_if_assigned: boolean;
  add_dependencies: boolean;
  remove_dependencies: boolean;
  set_custom_field_values: boolean;
  manage_custom_fields: boolean;
  can_pin_fields: boolean;
  add_attachments: boolean;
  edit_attachments: boolean;
  remove_attachments: boolean;
  comment: boolean;
  add_followers: boolean;
  remove_followers: boolean;
  add_self_follower: boolean;
  remove_self_follower: boolean;
  track_time: boolean;
  like_comments: boolean;
  move_task: boolean;
  change_clickapps: boolean;
  change_recurring: boolean;
  duplicate: boolean;
  merge: boolean;
  template: boolean;
  archive: boolean;
  delete: boolean;
  remove_status: boolean;
  add_status: boolean;
  change_time_estimate: boolean;
  change_points_estimate: boolean;
  can_create_tasks: boolean;
  create_view: boolean;
  delete_view: boolean;
  edit_view: boolean;
  permission_level: number;
  can_make_tasks_public: boolean;
  can_add_automation: boolean;
  can_delete_checklist_item: boolean;
  can_create_relationships: boolean;
  display_name: string;
  team_role: number;
  public_spaces_visible: boolean;
  can_create_spaces: boolean;
  can_create_projects: boolean;
  can_create_lists: boolean;
  can_edit_privacy: number;
  can_see_team_members: boolean;
  can_add_team_members: boolean;
  can_edit_team_members: boolean;
  can_edit_team_owner: boolean;
  can_edit_team: boolean;
  can_edit_space_settings: number;
  can_edit_project_settings: number;
  share: boolean;
  can_delete_comments: boolean;
  can_gdpr_export: boolean;
  can_export_tasks: boolean;
  can_import: boolean;
  can_edit_integrations: boolean;
  can_delete_no_access: boolean;
  manage_tags: boolean;
  manage_statuses: boolean;
  billing: boolean;
  oauth_apps: boolean;
  can_add_team_guests: boolean;
  can_view_reporting: boolean;
  can_create_goals: boolean;
  can_create_portfolios: boolean;
  can_edit_list_statuses: boolean;
  can_enable_sso: boolean;
  can_edit_description: boolean;
  profile: boolean;
  can_edit_trial: boolean;
  can_edit_view_protection: boolean;
  can_list_inaccessible_spaces: boolean;
  can_recover_inaccessible_spaces: boolean;
  create_dashboards: boolean;
  create_automation: boolean;
  make_views_public: boolean;
  can_edit_user_groups: boolean;
  can_be_added_to_user_groups: boolean;
  can_see_workload: boolean;
  can_create_workload: boolean;
  can_use_git: boolean;
  custom_roles: boolean;
  team_permissions: boolean;
  add_email_account: boolean;
  send_email: boolean;
  manage_custom_items: boolean;
  can_convert_item: boolean;
  can_create_milestone: boolean;
  can_see_time_spent: boolean;
  can_see_time_estimated: boolean;
  can_see_points_estimated: boolean;
  can_edit_tags: boolean;
}

export interface DueDates {
  enabled: boolean;
  start_date: boolean;
  remap_due_dates: boolean;
  remap_closed_due_date: boolean;
}

export interface Sprints {
  enabled: boolean;
}

export interface TimeTracking {
  enabled: boolean;
  harvest: boolean;
  rollup: boolean;
}

export interface Points {
  enabled: boolean;
}

export interface CustomItems {
  enabled: boolean;
}

export interface Priority {
  id: string;
  priority: string;
  color: string;
  orderindex: string;
}

export interface Priorities {
  enabled: boolean;
  priorities: Priority[];
}

export interface Tags {
  enabled: boolean;
}

export interface CheckUnresolved {
  enabled: boolean;
  subtasks?: boolean;
  checklists?: any;
  comments?: any;
}

export interface Zoom {
  enabled: boolean;
}

export interface Milestones {
  enabled: boolean;
}

export interface CustomFields {
  enabled: boolean;
}

export interface DependencyWarning {
  enabled: boolean;
}

export interface MultipleAssignees {
  enabled: boolean;
}

export interface Emails {
  enabled: boolean;
}

export interface RemapDependencies {
  enabled: boolean;
}

export interface Features2 {
  due_dates: DueDates;
  sprints: Sprints;
  time_tracking: TimeTracking;
  points: Points;
  custom_items: CustomItems;
  priorities: Priorities;
  tags: Tags;
  check_unresolved: CheckUnresolved;
  zoom: Zoom;
  milestones: Milestones;
  custom_fields: CustomFields;
  dependency_warning: DependencyWarning;
  multiple_assignees: MultipleAssignees;
  emails: Emails;
  remap_dependencies: RemapDependencies;
}

export interface Status {
  id: string;
  status: string;
  type: string;
  orderindex: number;
  color: string;
}

export interface Visible2 {
  due_date: boolean;
  start_date: boolean;
  date_created: boolean;
  date_updated: boolean;
  priority: boolean;
  assignees: boolean;
  task_id: boolean;
  time_spent: boolean;
}

export interface ListViewSettings2 {
  visible: Visible2;
  sorting: any[];
}

export interface AllStatus {
  status: string;
  type: string;
  orderindex: number;
  colors: string[];
}

export interface Project {
  id: string;
  owner: Owner2;
  team: Team2;
  name: string;
  date_created: string;
  private: boolean;
  multiple_assignees: boolean;
  slack_channel?: any;
  import_id?: any;
  import_uuid?: any;
  importing?: any;
  points: boolean;
  orderindex: number;
  template: boolean;
  date_deleted?: any;
  archived: boolean;
  deleted: boolean;
  content?: any;
  color?: any;
  due_date?: any;
  due_date_time: boolean;
  creator: number;
  storage_used: string;
  default_preset_view: number;
  preset_views: number[];
  list_view_settings?: any;
  board_view_settings?: any;
  calendar_view_settings?: any;
  gantt_view_settings?: any;
  avatar_source: string;
  avatar_value: string;
  list_view_template?: any;
  board_view_template?: any;
  calendar_view_template?: any;
  gantt_view_template?: any;
  list_view_update_views?: any;
  board_view_update_views?: any;
  calendar_view_update_views?: any;
  gantt_view_update_views?: any;
  deleted_by?: any;
  box_view_update_views?: any;
  box_view_template?: any;
  box_view_settings?: any;
  permissions: Permissions;
  public_sharing?: any;
  template_field_ids?: any;
  activity_view_template?: any;
  activity_view_update_views?: any;
  activity_view_settings?: any;
  mind_map_view_template?: any;
  mind_map_view_update_views?: any;
  mind_map_view_settings?: any;
  timeline_view_template?: any;
  timeline_view_update_views?: any;
  timeline_view_settings?: any;
  table_view_template?: any;
  table_view_update_views?: any;
  table_view_settings?: any;
  workload_view_template?: any;
  workload_view_update_views?: any;
  workload_view_settings?: any;
  points_estimate_rollup?: any;
  emails_as_replies?: any;
  admin_can_manage?: any;
  permanent_template_id?: any;
  project_prefix?: any;
  custom_task_ids_start_100?: any;
  custom_task_ids_start?: any;
  custom_task_ids_display?: any;
  emails_clickapp: boolean;
  time_in_status?: any;
  map_view_update_views?: any;
  map_view_template?: any;
  date_updated: string;
  custom_items?: any;
  priority?: any;
  project_orderindex: number;
  hide_project: boolean;
  default_category: string;
  hidden: boolean;
  avatar?: any;
  features: Features2;
  statuses: Status[];
  permission_level: number;
  automation_count: number;
  taskcount: string;
  repos: any[];
  listViewSettings: ListViewSettings2;
  all_statuses: AllStatus[];
}

export interface Team {
  id: string;
  color: string;
  trial_count?: any;
  using_github: boolean;
  using_gitlab?: any;
  setup_step: string;
  color_theme?: any;
  personal_team: boolean;
  should_encrypt: boolean;
  gantt_trial_end?: any;
  require_2fa: boolean;
  hours_per_day?: any;
  plan_id: string;
  time_tracking_display_hours: boolean;
  time_estimate_display_hours: boolean;
  disable_public_sharing?: any;
  disable_never_expire_pub_links: boolean;
  pub_links_max_year: boolean;
  estimates_per_assignee?: any;
  points_per_assignee?: any;
  zoom?: any;
  nested_subtasks?: any;
  nested_subtasks_level?: any;
  time_in_status?: any;
  quick_create_statuses: boolean;
  microsoft_365_preview: boolean;
  extra_comment_reactions: boolean;
  trial_plan_id?: any;
  allow_skip_2fa: boolean;
  lineup: boolean;
  threaded_comments: boolean;
  admin_public_share_override: boolean;
  enable_recorder: boolean;
  docs_home: boolean;
  hipaa_compliant: boolean;
  live_view: number;
  automation_enabled: boolean;
  user_presence: boolean;
  task_relationships: boolean;
  can_add_guests?: any;
  can_remove_guests?: any;
  wip_limit: boolean;
  hide_everything_calendar: boolean;
  hide_everything_board: boolean;
  emails_as_replies: boolean;
  time_tracking_rollup: boolean;
  disable_template_pub_sharing: boolean;
  time_estimate_rollup: boolean;
  enable_codox: boolean;
  dashboards_enabled: boolean;
  unstarted_status_group?: any;
  tasks_in_multiple_lists: boolean;
  subtasks_in_multiple_lists: boolean;
  points_estimate_rollup: boolean;
  giphy: boolean;
  points_scale: number[];
  custom_fields_legacy_ordering: boolean;
  default_project: string;
  role: number;
  date_joined: string;
  date_invited: string;
  invite: boolean;
  receive_notifs_gh_commit: boolean;
  owner: Owner;
  name: string;
  next_bill_date: string;
  date_created: string;
  service_status: number;
  billingexceptionpopupdismissed?: any;
  was_trial: boolean;
  stored_promo_code?: any;
  address?: any;
  dashboard_data_date?: any;
  v2_beta: boolean;
  orderindex: string;
  avatar?: any;
  initials: string;
  notification_settings: NotificationSettings;
  automation: Automation;
  v2_beta_ms_since: number;
  storage_used: StorageUsed;
  member_count: number;
  member_count_wo_invites: number;
  listViewSettings: ListViewSettings;
  storage: number;
  storage_per_user: number;
  members: Member[];
  repos: any[];
  available_storage: number;
  projects: Project[];
}

export interface ILoginResponse {
  email_validated: boolean;
  phone_validated: boolean;
  user: User;
  user_data?: any;
  token: string;
  form_token: string;
  expiration: number;
  refresh_token: string;
  loginToken?: any;
  v2_beta: boolean;
  created_from_v2: boolean;
  teams: Team[];
}

export interface IDevKey {
  key: string;
}

export interface Status {
  status: string;
  color: string;
  type: string;
  orderindex: number;
}

export interface DTOTask {
  id: string;
  name: string;
  status: Status;
  custom_type?: any;
}

export interface DTOUser {
  id: number;
  username: string;
  email: string;
  color: string;
  initials: string;
  profilePicture?: any;
}

export interface TaskLocation {
  list_id: string;
  folder_id: string;
  space_id: string;
  list_name: string;
  folder_name: string;
  space_name: string;
}

export interface ITimeEntry {
  id: string;
  task: DTOTask;
  wid: string;
  user: DTOUser;
  billable: boolean;
  start: string;
  end: string;
  duration: string;
  description: string;
  tags: any[];
  source: string;
  at: string;
  task_location: TaskLocation;
  task_tags: any[];
  task_url: string;
}

export interface DTOTimeEntries {
  data: ITimeEntry[];
}

export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export type DateRangeString = {
  startDate: string | number;
  endDate: string | number;
};

export type DateColumn = {
  id: string;
  isOnWeekend: boolean;
  label: string;
  isToday: boolean;
  totalTime: number;
  expectedTotalTime: number;
  isOnSalaryPeriod: boolean;
  timeEntries: ITimeEntry[];
};

export type Week = {
  id: string;
  label: string;
  period: { startDate: number; endDate: number };
  isCurrentWeek: boolean;
  days: DateColumn[];
  totalTime: number;
  weekNumber: number;
  totalTimeOnSalaryPeriod: number;
  expectedTotalTime: number;
  expectedTotalTimeOnSalaryPeriod: number;
};

export interface IGetTimeEntriesResponse {
  salaryPeriod: DateRange;
  viewPeriod: DateRange;
  weeks: Week[];
  expectedTotalTime: number;
  totalTime: number;
  totalTimeOnSalaryPeriod: number;
  isCurrentSalaryPeriod: boolean;
}

// Task Suggestions

export interface Creator {
  id: number;
  username: string;
  email: string;
  color: string;
  initials: string;
  profilePicture?: any;
}

export interface Status {
  status: string;
  color: string;
  type: string;
  orderindex: number;
}

export interface Subcategory {
  id: string;
  name: string;
  access: boolean;
  category: string;
  orderindex: number;
  private: boolean;
  color?: any;
  status?: any;
  override_statuses: boolean;
  sprint: boolean;
}

export interface Permissions {
  name: string;
  can_read: boolean;
  change_status: boolean;
  change_assignee: number;
  change_due_date: boolean;
  change_title: boolean;
  change_description: boolean;
  change_priority: boolean;
  change_incoming_address: boolean;
  edit_list_details: boolean;
  add_tags: boolean;
  remove_tags: boolean;
  add_subtasks: boolean;
  add_checklists: boolean;
  edit_checklists: boolean;
  can_resolve_checklist_item_if_assigned: boolean;
  add_dependencies: boolean;
  remove_dependencies: boolean;
  set_custom_field_values: boolean;
  manage_custom_fields: boolean;
  can_pin_fields: boolean;
  add_attachments: boolean;
  edit_attachments: boolean;
  remove_attachments: boolean;
  comment: boolean;
  add_followers: boolean;
  remove_followers: boolean;
  add_self_follower: boolean;
  remove_self_follower: boolean;
  track_time: boolean;
  like_comments: boolean;
  move_task: boolean;
  change_clickapps: boolean;
  change_recurring: boolean;
  duplicate: boolean;
  merge: boolean;
  template: boolean;
  archive: boolean;
  delete: boolean;
  remove_status: boolean;
  add_status: boolean;
  change_time_estimate: boolean;
  change_points_estimate: boolean;
  can_create_tasks: boolean;
  create_view: boolean;
  delete_view: boolean;
  edit_view: boolean;
  permission_level: number;
  can_make_tasks_public: boolean;
  can_add_automation: boolean;
  can_delete_checklist_item: boolean;
  can_create_relationships: boolean;
  display_name: string;
  team_role: number;
  public_spaces_visible: boolean;
  can_create_spaces: boolean;
  can_create_projects: boolean;
  can_create_lists: boolean;
  can_edit_privacy: number;
  can_see_team_members: boolean;
  can_edit_team: boolean;
  can_add_team_members: boolean;
  can_edit_team_members: boolean;
  can_edit_team_owner: boolean;
  can_edit_space_settings: number;
  can_edit_project_settings: number;
  share: boolean;
  can_delete_comments: boolean;
  can_gdpr_export: boolean;
  can_export_tasks: boolean;
  can_import: boolean;
  can_edit_integrations: boolean;
  can_delete_no_access: boolean;
  manage_tags: boolean;
  manage_statuses: boolean;
  billing: boolean;
  oauth_apps: boolean;
  can_add_team_guests: boolean;
  can_view_reporting: boolean;
  can_create_goals: boolean;
  can_create_portfolios: boolean;
  can_edit_list_statuses: boolean;
  can_enable_sso: boolean;
  can_edit_description: boolean;
  profile: boolean;
  can_edit_trial: boolean;
  can_edit_view_protection: boolean;
  can_list_inaccessible_spaces: boolean;
  can_recover_inaccessible_spaces: boolean;
  create_dashboards: boolean;
  create_automation: boolean;
  make_views_public: boolean;
  can_edit_user_groups: boolean;
  can_be_added_to_user_groups: boolean;
  can_see_workload: boolean;
  can_create_workload: boolean;
  can_use_git: boolean;
  custom_roles: boolean;
  team_permissions: boolean;
  add_email_account: boolean;
  send_email: boolean;
  manage_custom_items: boolean;
  can_convert_item: boolean;
  can_create_milestone: boolean;
  can_see_time_spent: boolean;
  can_see_time_estimated: boolean;
  can_see_points_estimated: boolean;
}

export interface Category {
  id: string;
  name: string;
  orderindex: number;
  override_statuses: boolean;
  access: boolean;
  hidden: boolean;
  permission_level: number;
}

export interface MultiOrderindexes {
  [key: number]: any;
}

export interface Project {
  id: string;
  name: string;
  access: boolean;
  permission_level: number;
  milestones: boolean;
}

export interface Assignee {
  id: number;
  username: string;
  email: string;
  color: string;
  initials: string;
  profilePicture?: any;
  time_estimate?: any;
}

export interface Sharing {
  public: boolean;
  public_share_expires_on?: any;
  public_fields: string[];
  token?: any;
  seo_optimized: boolean;
}

export interface Recur {
  recurring?: any;
  recur_next?: any;
  recur_on?: any;
  type?: any;
  recur_on_status?: any;
  new_status?: any;
  rule?: any;
  time?: any;
  due_date?: any;
  skip_missed?: any;
  copy_task?: any;
  copy_opts?: any;
  copy_original?: any;
  recur_immediately?: any;
  recur_daily?: any;
  copy_task_project_id?: any;
}

export interface CategoryDetails {
  id: string;
  name: string;
  hidden: boolean;
  access: boolean;
}

export interface ProjectDetails {
  id: string;
  name: string;
  access: boolean;
}

export interface OtherSubcategory {
  id: string;
  name: string;
  orderindex: number;
  content: string;
  color?: any;
  due_date: string;
  due_date_time: boolean;
  start_date: string;
  start_date_time?: any;
  hide_description: boolean;
  archived: boolean;
  category: string;
  encrypted: boolean;
  private: boolean;
  priority?: any;
  status?: any;
  assignee?: any;
  sprint: boolean;
  sprint_index: number;
  sprint_status?: any;
  sprint_start_date: string;
  sprint_end_date: string;
  sprint_date_done?: any;
  sprint_date_progress?: any;
  override_statuses: boolean;
  project_id: string;
  sprint_date_format: string;
  owner: number;
  can_see_time_spent: boolean;
  can_see_time_estimated: boolean;
  can_see_points_estimated: boolean;
  automation_count: number;
  points_total?: any;
  category_details: CategoryDetails;
  project_details: ProjectDetails;
  incoming_address: string;
  content_size: string;
  task_orderindex: string;
  siml_hierarchy: boolean;
}

export interface AvailableStatus {
  id: string;
  status: string;
  orderindex: number;
  color: string;
  type: string;
}

export interface Task {
  id: string;
  name: string;
  creator: Creator;
  date_created: string;
  date_updated: string;
  type: string;
  status: Status;
  subcategory: Subcategory;
  priority?: any;
  orderindex: string;
  boardindex: number;
  parent?: any;
  coverimage?: any;
  deleted: boolean;
  date_deleted?: any;
  due_date?: any;
  due_date_time: boolean;
  points?: any;
  start_date?: any;
  start_date_time: boolean;
  template: boolean;
  time_estimate?: any;
  archived: boolean;
  date_closed?: any;
  template_name?: any;
  recur_until?: any;
  show_completed?: any;
  time_estimate_string?: any;
  encrypted: boolean;
  recur_tz_offset?: any;
  recur_tz?: any;
  email_token?: any;
  private: boolean;
  owner: number;
  via?: any;
  recur_ignore_today?: any;
  assignee_orderindex: string;
  priority_orderindex: string;
  tag_orderindex: string;
  due_date_orderindex: string;
  subtask_orderindex: string;
  date_done: string;
  date_delegated?: any;
  status_id: string;
  delegator?: any;
  draft_uuid?: any;
  deleted_by?: any;
  merged_to?: any;
  recur_settings?: any;
  default_category_id?: any;
  editor_token: string;
  none_orderindex: string;
  form_id?: any;
  field_orderindex: string;
  subtask_sort: string;
  subtask_sort_dir: string;
  made_public_by?: any;
  made_public_time?: any;
  team_id?: any;
  permissions: Permissions;
  public_sharing?: any;
  template_field_ids?: any;
  custom_type?: any;
  date_active?: any;
  date_unstarted?: any;
  permanent_template_id?: any;
  relationship_order?: any;
  hide_relationships?: any;
  subtask_parent?: any;
  workspace_id: string;
  original_subcat?: any;
  created_by_email?: any;
  is_summary_task: boolean;
  template_visibility?: any;
  parent_id?: any;
  parent_orderindex?: any;
  parent_status?: any;
  subtask_parent_id?: any;
  subtask_parent_name?: any;
  subtask_parent_encrypted?: any;
  subtask_parent_orderindex?: any;
  subtask_parent_status?: any;
  project_id: string;
  category_permission_level: number;
  summary_task_app: boolean;
  category: Category;
  status_group: string;
  subcategory_status?: any;
  subcategory_sprint: boolean;
  project_using_github: boolean;
  project_using_gitlab?: any;
  project_using_bitbucket?: any;
  milestones: boolean;
  team: string;
  project_name: string;
  project_permission_level: number;
  inbox_orderindex?: any;
  project_access: boolean;
  multi_orderindexes: MultiOrderindexes;
  status_orderindex: string;
  project: Project;
  recurring_settings?: any;
  custom_id?: any;
  attachments_count: number;
  attachments_with_thumbnail_count: number;
  assigned_checklist_items: number;
  assigned_comments_count: number;
  unresolved_comments_count: number;
  group_assignees: any[];
  assignees: Assignee[];
  parent_task?: any;
  subtask_parent_task?: any;
  link_count: number;
  link_names: any[];
  dependency_count: number;
  dependency_names: any[];
  sharing: Sharing;
  recur: Recur;
  content_size: string;
  rollup: any[];
  permission_level: number;
  inbound_address: string;
  other_subcategories: OtherSubcategory[];
  siml_subcategories: any[];
  available_statuses: AvailableStatus[];
}

export interface TaskSuggestion {
  task_id: string;
  date: string;
  task: Task;
}

export interface SuggestionEnvelope {
  tasks: TaskSuggestion[];
  last_page: boolean;
}

export interface DTOTaskSuggestions {
  recentlyDone: SuggestionEnvelope;
  recentlyTracked: SuggestionEnvelope;
  recentlyCreated: SuggestionEnvelope;
  recentlyViewed: SuggestionEnvelope;
  recentlyUpdated: SuggestionEnvelope;
}

export type SuggestionAction = keyof DTOTaskSuggestions;

export interface TaskDTO {
  id: string;
  name: string;
  date: number;
  action: SuggestionAction;
  task_location: TaskLocation;
}

export interface TaskSuggestionDTO {
  id: string;
  name: string;
  dates: number[];
  actions: SuggestionAction[];
  task_location: TaskLocation;
}

export interface IGetTaskSuggestionsResponse {
  data: TaskSuggestionDTO[];
}
