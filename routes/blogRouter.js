const express = require('express');
const blogController = require('../controllers/blogcontrol')
const router = express.Router();



router.get('/create', blogController.blog_create);
   
router.get('/', blogController.blog_index);


router.post('/', blogController.blog_post);

// This will find the blog details one by one
    
router.get('/:id', blogController.blog_details);
    
// This will find the id in database and delete the record
  
router.delete('/:id', blogController.blog_delete);
    

  module.exports = router;