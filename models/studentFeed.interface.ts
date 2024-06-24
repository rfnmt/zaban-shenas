export interface StudentFeedRoot {
  feed: Feeds[];
  inbox: InboxListItem[];
  students: Students[];
  pagination: Pagination;
}
export interface Pagination {
  page: number;
  page_size: number;
  page_count: number;
  total: number;
}
export interface Students {
  id: number;
  data: Student;
}
export interface Student {
  id: number;
  username?: string;
  name: string;
  profile_pic?: string;
  follows_viewer: boolean;
  followed_by_viewer: boolean;
  created_at: string;
  is_premium: boolean;
}
export interface InboxListItem {
  id: number;
  data: Inbox;
}
export interface Inbox {
  id: number;
  contact_id: number;
  unread: number;
  summary: string;
  last_message_at: string;
  type: string;
  source_id: string;
  created_at: string;
}
export interface Feeds {
  id: number;
  data: Feed;
}
export interface Feed {
  id: number;
  type: string;
  created_at: string;
  updated_at: string;
  activity_id: number;
}
