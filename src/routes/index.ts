import Router from 'koa-router'
import { root } from '../controllers/root'

const router = new Router()

router.get('/', root)

router.post('/users', users.signUp)
router.post('/session/user', users.logIn)

export default router
