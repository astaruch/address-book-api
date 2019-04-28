import Router from 'koa-router'
import { root } from '../controllers/root'

const router = new Router()

router.get('/', root)

export default router
