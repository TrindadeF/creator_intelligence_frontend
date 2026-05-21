// ── Auth ───────────────────────────────────────────────────────────────────
export interface AuthResponse {
  access_token:  string;
  refresh_token: string;
  user:          User;
}

// ── User ───────────────────────────────────────────────────────────────────
export interface User {
  id:          string;
  name:        string;
  email:       string;
  avatar_url?: string;
  niche?:      string;
  bio?:        string;
  created_at:  string;
}

// ── Social Account ─────────────────────────────────────────────────────────
export interface SocialAccount {
  id:                  string;
  provider:            "tiktok" | "youtube" | "instagram";
  username:            string;
  connected_at:        string;
  metadata?:           Record<string, unknown>;
}

// ── Video ──────────────────────────────────────────────────────────────────
export interface Video {
  id:                string;
  external_video_id: string;
  title:             string;
  description?:      string;
  duration_seconds?: number;
  published_at:      string;
  thumbnail_url?:    string;
  hashtags?:         string[];
}

// ── Analytics ──────────────────────────────────────────────────────────────
export interface VideoAnalytic {
  id:              string;
  video_id:        string;
  views:           number;
  likes:           number;
  comments:        number;
  shares:          number;
  saves:           number;
  watch_time:      number;
  avg_watch_time:  number;
  retention_rate?: number;
  completion_rate: number;
  engagement_rate: number;
  collected_at:    string;
}

export interface OverviewAnalytics {
  total_views:       number;
  total_likes:       number;
  total_comments:    number;
  total_shares:      number;
  avg_engagement:    number;
  avg_watch_time:    number;
  followers_gained?: number;
}

// ── Insight ────────────────────────────────────────────────────────────────
export type InsightType =
  | "best_posting_time"
  | "retention_drop"
  | "format_performance"
  | "weak_hook"
  | "growth_opportunity"
  | "general";

export type InsightSeverity = "info" | "warning" | "success" | "critical";

export interface Insight {
  id:           string;
  insight_type: InsightType;
  title:        string;
  description:  string;
  severity:     InsightSeverity;
  created_at:   string;
  read?:        boolean;
}
