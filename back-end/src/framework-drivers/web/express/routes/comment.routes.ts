import express from 'express';
import { CommentController } from '../controllers/comment.controllers';
import { verifyToken, isAdmin } from '../../../../interface-adapters/http/middlewares/auth.middleware'; // اگه داری

const router = express.Router();

// همه کاربران
router.post('/', verifyToken, CommentController.create);
router.get('/post/:postId', CommentController.getByPost);

// فقط ادمین
router.get('/pending', verifyToken, isAdmin, CommentController.getPending);
router.patch('/:id/approve', verifyToken, isAdmin, CommentController.approve);
router.patch('/:id/reject', verifyToken, isAdmin, CommentController.reject);

export default router;
