const express = require("express");
const router = express.Router();
const AuthorContrller = require("../controller/author.controller");
const middlewareToken = require("../controller/middlewareToke");
router.get("/getAuthor" ,  AuthorContrller.HandlegetAuthor);
router.post('/insertAuthor', middlewareToken.checkRoleEmployees ,  AuthorContrller.HandleInsert);
router.get("/getByID/:id", middlewareToken.checkRoleEmployees, AuthorContrller.HandleGetById);
router.delete('/deleteAuthor/:id', middlewareToken.checkRoleEmployees , AuthorContrller.HandleDelete );
router.put("/updateAuthor/:id" , middlewareToken.checkRoleEmployees , AuthorContrller.HandleUpdate)

module.exports = router;