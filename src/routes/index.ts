import Router from 'koa-router'
import { root } from '../controllers/root'
import * as users from '../controllers/users'
import { authenticate } from '../middleware/authentication'
import { handleErrors, handleNotFound } from '../middleware/errors'

const router = new Router()
router.use(handleErrors)

router.get('/', root)

router.post('/session/user', users.login)
router.post('/users', users.signUp)

// eslint-disable-next-line no-warning-comments
// TODO: delete next route before sending the project. This is security issue
router.get('/users', authenticate, users.getAll)

router.use(handleNotFound)

export default router
