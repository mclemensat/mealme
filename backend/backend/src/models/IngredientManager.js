const AbstractManager = require("./AbstractManager");

class IngredientManager extends AbstractManager {
  static table = "ingredients";

  insert(ingredient) {
    return this.connection.query(
      `insert into ${IngredientManager.table} (name) values (?)`,
      [ingredient.name]
    );
  }

  update(ingredient) {
    return this.connection.query(
      `update ${IngredientManager.table} set name = ? where id = ?`,
      [ingredient.name, ingredient.id]
    );
  }
}

module.exports = IngredientManager;
