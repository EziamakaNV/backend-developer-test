/* eslint-disable linebreak-style */
import express from 'express';
import fixtureController from '../controllers/fixture';
import validations from '../middleware/validations';
import authentication from '../middleware/authentication';

const router = express.Router();

router.route('/')
  .post(authentication.adminVerifyToken, validations.addFixture, fixtureController.addFixture);

export default router;
