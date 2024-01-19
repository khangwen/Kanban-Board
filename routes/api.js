import express from 'express';
const router = express.Router();
// import { index, show, store, update, updateDescription, destroy } from '../app/controllers/taskController.js';
// extra credit for Project 6 - not working
import { index, show, store, update, destroy } from '../app/controllers/taskController.js';
import { indexType } from '../app/controllers/taskTypeController.js';
import { store as register } from '../app/controllers/userController.js';
import checkLogin from '../app/middlewares/auth.js';

router.get('/tasks', checkLogin, index);
router.get('/task-types', checkLogin, indexType);
router.get('/tasks/:id', checkLogin, show);
router.post('/tasks', checkLogin, store);
router.post('/user', register);
router.put('/tasks/:id', checkLogin, update);
// router.put('/tasks/description/:id', updateDescription); // extra credit for Project 6 - not working
router.delete('/tasks/:id', checkLogin, destroy);

export default router;

