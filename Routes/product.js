import express from "express"
import * as ProController from "../Controllers/product.js"

const router=express.Router();

router.get("/",ProController.getAllProducts)
router.get("/:prodid",ProController.getProdbyId)
router.delete("/:prodid",ProController.deleteProdbyId)
router.post("/",ProController.addProd)
router.put("/:prodid",ProController.updateProd)

export default router;