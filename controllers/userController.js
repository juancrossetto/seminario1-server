const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const Income = require("../models/Income");
// const Expense = require("../models/Expense");
// const Loan = require("../models/Loan");
// const Budget = require("../models/Budget");
// const CreditCard = require("../models/CreditCard");
// const CreditCardMovement = require("../models/CreditCardMovement");
// const BankAccount = require("../models/BankAccount");
// const BankAccountMovement = require("../models/BankAccountMovement");
// const Investment = require("../models/Investment");

exports.createUser = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    // Revisar que el usuario registrado sea unico
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // crea el nuevo usuario
    user = new User(req.body);

    // Hashear el password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // guardar usuario
    await user.save();
    res.json({ user });
  } catch (error) {
    console.log(JSON.stringify(error))
    res.status(400).send("Hubo un error: ");
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        res.json({ user });
      } else {

        res.status(500).send("No se encontro un usuario con ese email");
      }
    } else {
      res.status(500).send("Para obtener un usuario debe indicar un email");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al obtener los usuarios");
  }
};

exports.loginFromGoogle = async (req, res) => {
  try {
    let googleUser = req.body;
    const user = await User.findOne(googleUser.email);
    if (user) {
      user.fromGoogle = true;
      user = await User.findOneAndUpdate({ _id: user._id }, user);
      res.json({ user });
    } else {
      res.status(500).send("No se encontro un usuario con ese email");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al obtener los usuarios");
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Extraer el usuario y comprobar si existe
    const { name, email, surname, prefix, phoneNumber, image, fromGoogle } = req.body;

    // Si el Usuario existe o no
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "No existe ese Usuario" });
    }

    // Crear un objeto con la nueva información
    const newUser = {};
    newUser.name = name ? name : newUser.name;
    newUser.email = email ? email : email.name;
    newUser.surname = surname ? surname : newUser.surname;
    newUser.prefix = prefix ? prefix : newUser.prefix;
    newUser.phoneNumber = phoneNumber ? phoneNumber : newUser.phoneNumber;
    newUser.image = image ? image : newUser.image;
    newUser.fromGoogle = fromGoogle ? fromGoogle : newUser.fromGoogle
    // Guardar el usuario (en caso de no existir lo crea)
    user = await User.findOneAndUpdate({ _id: req.params.id }, newUser, {
      new: true,
    });

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "No existe el usuario" });
    }

    await User.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Usuario Eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getAllTravels = async (req, res) => {
  let user = await User.findOne({ email: req.params.email });
  if (!user) {
    return res.status(404).json({ msg: "No existe el usuario" });
  }

  return res.status(200).json(user.travels);
}

exports.getPlaces = async (req, res) => {
  let user = await User.findOne({ email: req.params.email });
  if (!user) {
    return res.status(404).json({ msg: "No existe el usuario" });
  }

  return res.status(200).json(user.places);
}

exports.updateTravels = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "No existe el usuario" });
    }

    user.travels.push(req.body);
    user = await User.findOneAndUpdate({ _id: user._id }, user);
    console.log(user)
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
}


exports.updatePlaces = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "No existe el usuario" });
    }
    user.places.push(req.body);
    user = await User.findOneAndUpdate({ _id: user._id }, user);
    console.log(user)
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
}

exports.deletePlace = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "No existe el usuario" });
    }
    let placesToUpdate = user.places.filter(place => place._id != req.body._id);
    user.places = placesToUpdate;
    user = await User.findOneAndUpdate({ _id: user._id }, user);
    console.log(user)
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
}

// exports.getAllData = async (req, res) => {
//   try {
//     const { email } = req.params;
//     if (email) {
//       var incomes = await Income.find({ email });
//       var expenses = await Expense.find({ email });
//       var loans = await Loan.find({ email });
//       var creditCards = await CreditCard.find({ email });
//       var bankAccounts = await BankAccount.find({ email });
//       var budgets = await Budget.find({ email });
//       var creditCardMovements = await CreditCardMovement.find({ email });
//       var bankAccountMovements = await BankAccountMovement.find({ email });
//       var investments = await Investment.find({ email });
//       res.json({
//         incomes,
//         expenses,
//         loans,
//         creditCards,
//         bankAccounts,
//         budgets,
//         investments,
//         creditCardMovements,
//         bankAccountMovements,
//       });
//     } else {
//       res.status(500).send("Para obtener la información debe indicar un email");
//     }
//   } catch (error) {}
// };
