import Comment from '../../models/Comment'
import { type IComment } from '../../interfaces/models'
import CustomError from '../../helpers/CustomError'
const addCommentQuery = async (commentData: {
  userId: number
  postId: number
  commentText: string
}): Promise<IComment | null> => {
  try {
    const { userId, postId, commentText } = commentData
    const comment = await Comment.create({
      comment_text: commentText,
      post_id: postId,
      user_id: userId
    })
    return comment
  } catch (error) {
    throw new CustomError(500, 'Error when create comment query')
  }
}
export default addCommentQuery
