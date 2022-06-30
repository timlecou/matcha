import { Router } from 'express';
import Container from 'typedi';
import { handleController } from '../middlewares/handle-controller.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { AuthController } from './auth.controller';
import { LoginDTO, RegisterDTO } from './auth.dto';

const router = Router();
const auth_controller = Container.get(AuthController);

router.post('/register', validateBody(RegisterDTO), handleController(auth_controller, auth_controller.register));
router.post('/login', validateBody(LoginDTO), handleController(auth_controller, auth_controller.login));

export default router;
