import Router from 'koa-router'
import { root } from '../controllers/root'
import * as users from '../controllers/users'
import { authenticate } from '../middleware/authentication'

const router = new Router()

router.get('/', root)

router.post('/users', users.signUp)
router.post('/session/user', users.login)

router.get('/users', authenticate, users.getAll)

export default router
