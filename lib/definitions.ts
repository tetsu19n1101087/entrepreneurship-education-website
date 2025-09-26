export interface Case {
  id: string
  title: string
  description: string
  content: string
  school_type: "elementary" | "junior_high" | "high_school" | "others"
  subject: string
  grade_level?: string
  duration?: string
  materials?: string
  tags: string[]
  author_id: string
  created_at: string
  updated_at: string
  header_image_url?: string
  profiles?: {
    display_name: string
    school_name: string
  }
}

export interface Comment {
  id: string
  case_id: string
  author_id: string
  parent_id?: string
  content: string
  created_at: string
  updated_at: string
  likes_count: number
  // Joined data
  profiles?: {
    display_name: string
    school_name: string
  }
  replies?: Comment[]
}

export interface Profile {
  id: string
  display_name: string
  school_name: string
  school_type: string
  subject?: string
  years_experience?: number
  bio?: string
  avatar_url?: string
}
