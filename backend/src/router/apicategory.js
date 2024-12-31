const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/categoryController');
const middlewareToken = require('../controller/middlewareToke');
router.get('/getcategory' , CategoryController.get_listCategory);

router.post('/addcategory'  , middlewareToken.checkRoleEmployees , CategoryController.HandleInsertCategory);
router.get(
  "/getcategory/:id",
  middlewareToken.checkRoleEmployees,
  CategoryController.HandlegetByID
);
router.put(
  "/updatecategory/:id",
  middlewareToken.checkRoleEmployees,
  CategoryController.HandleUpdate
);
router.delete(
  "/deletecategory/:id",
  middlewareToken.checkRoleEmployees,
  CategoryController.HandleDelete
);


module.exports = router;