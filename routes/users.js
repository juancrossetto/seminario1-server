const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
// Create an user
// api/users
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("email", "El mail es obligatorio").not().isEmpty(),
    check("phoneNumber", "Agrega un número de telefono válido").isNumeric(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  userController.createUser
);

// router.get("/:userType", auth, userController.getUsers);

// Get User By Email
// api/users/:email
router.get("/:email", userController.getUserByEmail);

router.post("/google/:email", userController.loginFromGoogle);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.get("/travel/:email", userController.getAllTravels);

router.get("/places/:email", userController.getPlaces);

router.delete("/places/:email", userController.deletePlace);

router.post("/places/:email", userController.insertPlace);

router.put("/places/:email", userController.updatePlaces);

router.post("/travels/:email", userController.updateTravels);
// router.get("/getAllData/:email", userController.getAllData);

module.exports = router;
