import Router from '@koa/router';
import * as ctrl from '../controllers/orderController';

const router = new Router();

router.get('/pedidos', ctrl.listar);
router.get('/pedidos/:id', ctrl.buscar);
router.post('/pedidos', ctrl.criar);
router.put('/pedidos/:id', ctrl.atualizar);

export default router;
