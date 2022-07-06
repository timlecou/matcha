import multer from 'multer';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { AUTHROIZED_FILE_MIME_TYPES, UPLOAD_DIR } from '../user/photo/upload.config';

export const uploadMiddleware = multer(
{
	dest: UPLOAD_DIR,
	fileFilter: (_, file, cb) =>
	{
		if (AUTHROIZED_FILE_MIME_TYPES.includes(file.mimetype))
			cb(null, true);
		else
			cb(new BadRequestException("Bad file format"));
	}
})