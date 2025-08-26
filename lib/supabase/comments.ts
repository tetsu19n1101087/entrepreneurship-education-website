import { createClient } from "@/lib/supabase/client"

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
    full_name: string
    school: string
  }
  replies?: Comment[]
}

export async function getCommentsByCase(caseId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      profiles (
        full_name,
        school
      )
    `)
    .eq("case_id", caseId)
    .is("parent_id", null)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching comments:", error)
    return []
  }

  // Get replies for each comment
  const commentsWithReplies = await Promise.all(
    data.map(async (comment) => {
      const { data: replies } = await supabase
        .from("comments")
        .select(`
          *,
          profiles (
            full_name,
            school
          )
        `)
        .eq("parent_id", comment.id)
        .order("created_at", { ascending: true })

      return {
        ...comment,
        replies: replies || [],
      }
    }),
  )

  return commentsWithReplies as Comment[]
}

export async function createComment(
  commentData: Omit<Comment, "id" | "created_at" | "updated_at" | "likes_count" | "profiles" | "replies">,
) {
  const supabase = createClient()

  const { data, error } = await supabase.from("comments").insert([commentData]).select().single()

  if (error) {
    console.error("Error creating comment:", error)
    throw error
  }

  return data as Comment
}
