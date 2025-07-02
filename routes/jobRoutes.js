import express from 'express';
import { addJob, apply, getAllJobs, getFilteredJobs } from '../controllers/jobController.js';
import auth from '../middleware/userMiddleware.js';

const router = express.Router();

router.post('/add', auth, addJob);
router.post('/apply/:id', auth, apply);
router.get('/all', getAllJobs);
router.get('/filter/:term', getFilteredJobs);

export default router;