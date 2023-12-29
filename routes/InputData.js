import express from 'express';
import InputDataController from '../controllers/InputData.js';

const router = express.Router();
const { saveInputData, getAllSavedInputDatas, updateInputData, deleteInputData } = InputDataController;

router.post('/saveInputData/:userName', saveInputData);
router.get('/getAllSavedInputDatas/:userName', getAllSavedInputDatas);
router.post('/updateInputData/:userName/:index', updateInputData)
router.delete('/deleteInputData/:userName/:index', deleteInputData)

export default router;