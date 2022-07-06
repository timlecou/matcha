import { Router } from 'express';
import Container from 'typedi';
import { AuthGuard } from '../../guards/auth.guard';
import { handleController } from '../../middlewares/handle-controller.middleware';
import { uploadMiddleware } from '../../middlewares/upload.middleware';
import { PhotoController } from './photo.controller';

const router = Router({mergeParams: true});
const photo_controller = Container.get(PhotoController);

router.get('', AuthGuard, handleController(photo_controller, photo_controller.getAllPhotos));
router.post('', AuthGuard, uploadMiddleware.single('photo'), handleController(photo_controller, photo_controller.addPhoto));
router.delete('/:photo_id', AuthGuard, handleController(photo_controller, photo_controller.deletePhoto));

export default router;