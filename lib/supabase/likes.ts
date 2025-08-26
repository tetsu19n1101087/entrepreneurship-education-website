import { createClient } from "@/lib/supabase/client"

export async function toggleCaseLike(caseId: string, userId: string) {
  const supabase = createClient()

  // Check if like exists
  const { data: existingLike } = await supabase
    .from("likes")
    .select("id")
    .eq("case_id", caseId)
    .eq("user_id", userId)
    .single()

  if (existingLike) {
    // Remove like
    const { error } = await supabase.from("likes").delete().eq("case_id", caseId).eq("user_id", userId)

    if (error) throw error
    return false
  } else {
    // Add like
    const { error } = await supabase.from("likes").insert([{ case_id: caseId, user_id: userId }])

    if (error) throw error
    return true
  }
}

export async function toggleCommentLike(commentId: string, userId: string) {
  const supabase = createClient()

  // Check if like exists
  const { data: existingLike } = await supabase
    .from("likes")
    .select("id")
    .eq("comment_id", commentId)
    .eq("user_id", userId)
    .single()

  if (existingLike) {
    // Remove like
    const { error } = await supabase.from("likes").delete().eq("comment_id", commentId).eq("user_id", userId)

    if (error) throw error
    return false
  } else {
    // Add like
    const { error } = await supabase.from("likes").insert([{ comment_id: commentId, user_id: userId }])

    if (error) throw error
    return true
  }
}

export async function getUserLikes(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("likes").select("case_id, comment_id").eq("user_id", userId)

  if (error) {
    console.error("Error fetching user likes:", error)
    return { caseLikes: [], commentLikes: [] }
  }

  const caseLikes = data.filter((like) => like.case_id).map((like) => like.case_id)
  const commentLikes = data.filter((like) => like.comment_id).map((like) => like.comment_id)

  return { caseLikes, commentLikes }
}
