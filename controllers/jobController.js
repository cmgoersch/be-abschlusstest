import Job from '../models/Job.js';
export const addJob = async (req, res) => {
  if (req.user.role !== 'company') return res.status(403).json({ error: 'Nur Unternehmen dürfen Jobs posten' });
  const job = await Job.create({ ...req.body, company: req.user.id });
  res.status(201).json(job);
};
export const apply = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job nicht gefunden' });
  if (!job.applicants.includes(req.user.id)) {
    job.applicants.push(req.user.id);
    await job.save();
  }
  res.json({ message: 'Erfolgreich beworben' });
};
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find()
    .populate('applicants', 'email fullname');
  res.json(jobs);
};
export const getFilteredJobs = async (req, res) => {
  const { term } = req.params;
  const jobs = await Job.find({ title: new RegExp(term, 'i') });
  res.json(jobs);
};
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job nicht gefunden' });
    if (job.company.toString() !== req.user.id) return res.status(403).json({ error: 'Nicht berechtigt' });

    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Serverfehler', details: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job nicht gefunden' });
    if (job.company.toString() !== req.user.id) return res.status(403).json({ error: 'Nicht berechtigt' });

    await job.deleteOne();
    res.json({ message: 'Job erfolgreich gelöscht' });
  } catch (err) {
    res.status(500).json({ error: 'Serverfehler', details: err.message });
  }
};
