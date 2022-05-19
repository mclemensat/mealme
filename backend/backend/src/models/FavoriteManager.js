const AbstractManager = require("./AbstractManager");

class FavoriteManager extends AbstractManager {
  static table = "favorites";

  findByUser(userId) {
    return this.connection.query(
      `SELECT * FROM ${FavoriteManager.table} WHERE user_id = ?`,
      [userId]
    );
  }

  insert(favorite) {
    return this.connection.query(
      `INSERT INTO ${FavoriteManager.table} (user_id, recipe_id) VALUES (?, ?)`,
      [favorite.user_id, favorite.recipe_id]
    );
  }

  update(favorite) {
    return this.connection.query(
      `UPDATE ${FavoriteManager.table} SET recipe_id = ? WHERE user_id = ?`,
      [favorite.recipe_id, favorite.user_id]
    );
  }
}

module.exports = FavoriteManager;
