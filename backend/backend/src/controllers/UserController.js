const argon2 = require("argon2");
const models = require("../models");

class UserController {
  static browse = (req, res) => {
    models.users
      .findAllUsers()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static login = async (req, res) => {
    const { username, password } = req.body.user;

    try {
      const [result] = await models.users.findByUser(username);

      if (!result.length) {
        res.sendStatus(401);
      }

      if (result.length) {
        const hashedPassword = result[0].password;
        if (await argon2.verify(hashedPassword, password)) {
          const { cryptedPassword, ...user } = result[0];
          // Ajout des recettes favorites au profil de l'utilisateur
          const [favorites] = await models.favorites.findByUser(user.id);
          user.favorites = favorites;
          res.send(user);
        }
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

  static sign = async (req, res) => {
    const user = req.body.user;

    const [getUser] = await models.users.findByUser(user.username);

    if (!getUser) {
      return res.sendStatus(401);
    }

    try {
      user.password = await argon2.hash(user.password);

      models.users.insert(user.username, user.password).then((item) => {
        res.status(201).send(item);
      });
    } catch (err) {
      console.error(err);
      res.sendStatus(500).send(err.code);
    }

    return null;
  };
}

module.exports = UserController;
