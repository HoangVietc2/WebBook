const express = require("express");
const router = express.Router();
const ApmContrller = require("../controller/apmController");
const middlewareToken = require("../controller/middlewareToke");
router.post(
  "/insertApm", middlewareToken.verifyToken, ApmContrller.HandleInsertApm
);
router.get("/getUserRole" , middlewareToken.verifyToken , ApmContrller.HandlegetUserRole);
router.get("/listbyUser" , middlewareToken.verifyToken , ApmContrller.GetListByUser)
router.get("/listApmAdmin" , middlewareToken.verifyToken , ApmContrller.GetListApmAdmin)
router.put("/updateApmAdmin/:id" , middlewareToken.verifyToken, ApmContrller.UpdateApmAdmin);
module.exports = router;