import { type Response, type NextFunction } from 'express'
import { getUserFollowing } from '../../queries/follow/showUserFollowing'
import CustomError from '../../helpers/CustomError'
import { type CustomRequest } from '../../interfaces/iAuth'

const showUserFollowing = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const followerId: number | undefined = req.user?.userId

    if (!followerId) {
      throw new CustomError(400, 'User ID not found')
    }

    const followers = await getUserFollowing(followerId)

    if (followers.length > 0) {
      res.json({
        data: followers
      })
    } else {
      next(new CustomError(404, 'The User Doesn\'t Have Any Followers'))
    }
  } catch (err: unknown) {
    next(err)
  }
}

export { showUserFollowing }
