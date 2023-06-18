import { type Response, type NextFunction } from 'express'
import { type CustomRequest } from '../../interfaces/iAuth'
import { deleteCommentQuery, getCommentQuery } from '../../queries'
import CustomError from '../../helpers/CustomError'
import { validateCommentId } from '../../validation'

const deleteComment = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId as number

    const { commentId } = await validateCommentId.validate(req.params)

    const comment = await getCommentQuery(Number(commentId))

    if (comment === null) {
      throw new CustomError(400, 'The Comment Was Not Found')
    }

    if (comment?.userId !== userId) {
      throw new CustomError(401, 'you are unauthorized to delete this comment')
    }

    const deletedComment = await deleteCommentQuery(Number(commentId))

    if (deletedComment) {
      res.json({
        message: 'Comment Deleted Successfully'
      })
    } else {
      throw new CustomError(400, 'The Comment Was Not Found')
    }
  } catch (err: unknown) {
    next(err)
  }
}

export default deleteComment
