import express from 'express';
const router = express.Router();
import { verify } from '../middlewares/userAuth.js';
import {  getProfile, listAllUsers, listCompanies,  ownProfile} from '../controllers/UserController';
import {  getPostsForFeed } from '../controllers/PostController';

router.get('/ownProfile' , verify , ownProfile);

router.get('/profile/:id' , verify,  getProfile); 

router.get('/listusers' , verify,  listAllUsers);

router.get('/companies' , verify , listCompanies);

router.get('/feedposts' , verify, getPostsForFeed);

export default router;