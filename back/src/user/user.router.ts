import { Router } from 'express';
import Container from 'typedi';
import { AuthGuard } from '../guards/auth.guard';
import { handleController } from '../middlewares/handle-controller.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { UserController } from './user.controller';
import { UpdateProfileDTO } from './user.dto';
import InterestRouter from './interest/interest.router';
import PhotoRouter from './photo/photo.router';

const router = Router();
const user_controller = Container.get(UserController);

router.get('', handleController(user_controller, user_controller.getAllUsers));
router.delete('', handleController(user_controller, user_controller.removeAllUsers));
router.put('', AuthGuard, validateBody(UpdateProfileDTO), handleController(user_controller, user_controller.updateUser));

router.use("/:user_id/interests/", InterestRouter);
router.use("/:user_id/photos/", PhotoRouter);

export default router;