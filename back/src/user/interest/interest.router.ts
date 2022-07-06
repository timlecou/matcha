import { Router } from 'express';
import Container from 'typedi';
import { AuthGuard } from '../../guards/auth.guard';
import { handleController } from '../../middlewares/handle-controller.middleware';
import { validateBody } from '../../middlewares/validation.middleware';
import { InterestController } from './interest.controller';
import { AddInterestDTO } from './interest.dto';

const router = Router({mergeParams: true});
const interest_controller = Container.get(InterestController);

router.get('', AuthGuard, handleController(interest_controller, interest_controller.getAllInterest));
router.post('', AuthGuard, validateBody(AddInterestDTO), handleController(interest_controller, interest_controller.addInterest));
router.delete('/:interest_name', AuthGuard, handleController(interest_controller, interest_controller.removeInterest));


export default router;