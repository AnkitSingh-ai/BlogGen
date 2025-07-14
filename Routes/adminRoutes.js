import express from 'express';
import { adminLogin, adminLogout, deleteCommentById, getAllBlogsAdmin, getAllComments ,approveCommentById,getDashboard} from '../controller/adminController.js';
import auth from '../Middleware/auth.js';


const adminRouter = express.Router();
adminRouter.post('/login', adminLogin);
adminRouter.get("/comments", auth, getAllComments)
adminRouter.get("/blogs", auth, getAllBlogsAdmin)
adminRouter.delete('/comment/:id', auth, deleteCommentById);
adminRouter.post("/approve-comment" , auth, approveCommentById)
adminRouter.get("/dashboard" , auth, getDashboard)


// ...existing routes...
adminRouter.post('/logout', auth, adminLogout);

export default adminRouter;