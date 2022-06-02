const mysql = require('mysql2/promise');
const { dbConfig } = require('../helpers');

async function getTasksFromDb(userId) {
  try {
    const sql = 'SELECT id, task as description FROM tasks WHERE user_id=?';
    const con = await mysql.createConnection(dbConfig);
    const [tasks] = await con.execute(sql, [userId]);
    await con.close();
    return tasks;
  } catch (error) {
    return false;
  }
}

async function createNewTask(userId, description) {
  try {
    const sql = 'INSERT INTO tasks (user_id, task) VALUES (?, ?)';
    const con = await mysql.createConnection(dbConfig);
    const [tasks] = await con.execute(sql, [userId, description]);
    await con.close();
    return tasks;
  } catch (error) {
    return false;
  }
}

async function deleteTaskFromDb(userId, taskId) {
  try {
    const sql = 'DELETE FROM tasks WHERE user_id=? AND id=?';
    const con = await mysql.createConnection(dbConfig);
    const [tasks] = await con.execute(sql, [userId, taskId]);
    await con.close();
    return tasks;
  } catch (error) {
    return false;
  }
}

module.exports = { getTasksFromDb, createNewTask, deleteTaskFromDb };
