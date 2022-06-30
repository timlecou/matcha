import { Router } from 'express';
import Container from 'typedi';
import { handleController } from '../middlewares/handle-controller.middleware';
import { UserController } from './user.controller';

const router = Router();
const user_controller = Container.get(UserController);

router.get('', handleController(user_controller, user_controller.getAllUsers));

export default router;