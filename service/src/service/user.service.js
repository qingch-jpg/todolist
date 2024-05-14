const connection = require('../app/database')

class UserService {
  async create(info) {
    const { task_name, task_description, state } = info
    const statement = 'INSERT INTO `task` (task_name, task_description,state) VALUES (?,?,?);'
    const [result] = await connection.execute(statement, [task_name, task_description, state])
    return result
  }

  async queryTask() {
    const statement = "SELECT * FROM `task`;";
    const [values] = await connection.execute(statement);
    return values;
  }

  async changeTaskState(info) {
    let { id , state } = info;
    const statement = `UPDATE task SET state = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [state, id]);
    return result;
  }

  async deleteTask(info) {
    const { id } = info
    const statement = "DELETE FROM task WHERE id = ?;";
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

}

module.exports = new UserService()
