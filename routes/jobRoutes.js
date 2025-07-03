import express from 'express';
import { addJob, apply, deleteJob, getAllJobs, getFilteredJobs, updateJob } from '../controllers/jobController.js';
import auth from '../middleware/userMiddleware.js';

const router = express.Router();

router.post('/add', auth, addJob);
router.post('/apply/:id', auth, apply);
router.get('/all', getAllJobs);
router.put('/update/:id', auth, updateJob);
router.delete('/delete/:id', auth, deleteJob);
router.get('/filter/:term', getFilteredJobs);

export default router;