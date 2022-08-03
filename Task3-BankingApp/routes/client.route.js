const router = require("express").Router()
const client = require("../app/controller/client.controller")

router.get("/", client.home)

router.get("/addNew", client.newAdd)
router.post("/addNew", client.newAddLogic)

router.get("/add", client.addPost)
router.post("/addLogic", client.addLogicPost)

router.get("/single/:id", client.single)

router.get("/delete/:id", client.del)

router.get("/edit/:id", client.edit)
router.post("/edit/:id", client.editLogic)

router.get("/makeTrans/:id" , client.makeTrans)
router.post("/makeTrans/:id" , client.makeTransLogic)

module.exports=router