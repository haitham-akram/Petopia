import { type Response, type NextFunction } from 'express'
import { config } from 'dotenv'

import CustomError from '../helpers/CustomError'
import { type CustomRequest } from '../interfaces/iAuth'
import { getUserQuery } from '../queries/user'

config()

enum userTypes {
  ADMIN = 'admin',
  REGULAR = 'regular',
}

const checkType = (authorizedTypes: userTypes[]) => async (req: CustomRequest, _res: Response, next: NextFunction) => {
  if (req.user == null) {
    throw new CustomError(401, 'Unauthorized')
  }
  const { userId } = req.user
  const user = (await getUserQuery(userId)).toJSON()

  if (user === null) {
    next(new CustomError(404, 'User not found'))
  } else {
    if (authorizedTypes.includes(user.userType as userTypes)) {
      next()
    } else {
      next(new CustomError(403, 'Not enough permissions'))
    }
  }
}
export default checkType
