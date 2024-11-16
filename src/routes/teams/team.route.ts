import { Router } from 'express';
const router = Router();
router.get('/teams',(req, res) => {
    res.send('Teams')
});

export default router;