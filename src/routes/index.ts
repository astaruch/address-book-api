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

router.get('/users', authenticate, users.getAll)
router.use(handleNotFound)

export default router
