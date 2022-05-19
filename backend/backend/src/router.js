const express = require("express");

const {
  IngredientController,
  UserController,
  FavoriteController,
} = require("./controllers");

const router = express.Router();

router.get("/ingredients", IngredientController.browse);
router.get("/ingredients/:id", IngredientController.read);
router.put("/ingredients/:id", IngredientController.edit);
router.post("/ingredients", IngredientController.add);
router.delete("/ingredients/:id", IngredientController.delete);

router.get("/users", UserController.browse);
router.post("/login", UserController.login);
router.post("/signin", UserController.sign);

router.get("/favorites", FavoriteController.browse);
router.get("/favorites/:id", FavoriteController.read);
router.put("/favorites/:id", FavoriteController.edit);
router.post("/favorites", FavoriteController.add);
router.delete("/favorites/:id", FavoriteController.delete);

module.exports = router;
