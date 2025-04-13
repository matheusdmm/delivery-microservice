import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import router from './routes/orderRoutes';

dotenv.config();

const app = new Koa();
const port = process.env.PORT || 3000;

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

export default app;
