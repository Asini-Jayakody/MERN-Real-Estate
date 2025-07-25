import express from 'express'
import { deleteUser, test , updateUser, getUserListing, getUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/validateUser.js'

const router = express.Router()

router.get('/test' , test)
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listing/:id',verifyToken,getUserListing)
router.get('/:id', getUser)
export default router;