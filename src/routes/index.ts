import Router from 'koa-router'
import { root } from '../controllers/root'
import * as users from '../controllers/users'
import * as contacts from '../controllers/contacts'
import { authenticate } from '../middleware/authentication'
import { handleErrors, handleNotFound } from '../middleware/errors'

const router = new Router()
router.use(handleErrors)

router.get('/', root)

router.post('/session/user', users.login)
router.post('/users', users.signUp)

router.post('/contacts', authenticate, contacts.create)
router.get('/contacts', authenticate, contacts.getAll)

router.use(handleNotFound)

export default router
