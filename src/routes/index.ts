import Router from 'koa-router';
import { getStatus } from '../controllers/statusController';

const router = new Router();

router.get('/status', getStatus);

export default router;
