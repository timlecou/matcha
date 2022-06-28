import { Response, Router } from 'express';
import Container from 'typedi';
import { UserController } from './user.controller';

const router = Router();
const user_controller = Container.get(UserController);

router.get('', (_, res: Response) => user_controller.getAllUsers(res));

export default router;