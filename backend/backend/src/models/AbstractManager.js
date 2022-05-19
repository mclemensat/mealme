class AbstractManager {
  constructor(connection, table) {
    this.connection = connection;
    this.table = table;
  }

  find(id) {
    return this.connection.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findAll(params = { orderBy: { field: "name", order: "ASC" } }) {
    return this.connection.query(
      `select * from  ${this.table} ORDER BY ${params.orderBy.field} ${params.orderBy.order}`
    );
  }

  findAllUsers(params = { orderBy: { field: "username", order: "ASC" } }) {
    return this.connection.query(
      `select * from  ${this.table} ORDER BY ${params.orderBy.field} ${params.orderBy.order}`
    );
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = AbstractManager;
