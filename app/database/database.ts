import * as SQLite from 'expo-sqlite';

// Open or create a SQLite database
const db = SQLite.openDatabaseSync("todo.db");

// Initialize the database
export const init = () => {
  return new Promise<void>((resolve, reject) => {
    db.withTransactionSync(() => {
      // Create groups table
      db.runSync(
        `CREATE TABLE IF NOT EXISTS groups (
           id INTEGER PRIMARY KEY NOT NULL,
           name TEXT NOT NULL
         );`,
        [],
        () => {
          // Create tasks table after creating groups
          db.runSync(
            `CREATE TABLE IF NOT EXISTS tasks (
               id INTEGER PRIMARY KEY NOT NULL,
               groupId INTEGER,
               title TEXT NOT NULL,
               description TEXT,
               done INTEGER DEFAULT 0,
               FOREIGN KEY (groupId) REFERENCES groups(id)
             );`,
       
          );
        },
 
      );
    });
  });
};

// Insert a new group
export const insertGroup = (name: string) => {
  return new Promise(() => {
    db.withTransactionSync(() => {
      db.runSync(
        `INSERT INTO groups (name) VALUES (?);`,
      );
    });
  });
};

// Fetch all groups
export const fetchGroups = () => {
  return new Promise(() => {
    db.withTransactionSync(() => {
      db.runSync(
        `SELECT * FROM groups;`,
      );
    });
  });
};

// Insert a new task
export const insertTask = (title: string, description: string, groupId: number) => {
  return new Promise(() => {
    db.withTransactionSync(() => {
      db.runSync(
        `INSERT INTO tasks (title, description, done, groupId) VALUES (?, ?, 0, ?);`,
      );
    });
  });
};

// Fetch tasks by group ID
export const fetchTasks = (groupId: number) => {
  return new Promise(() => {
    db.withTransactionSync(() => {
      db.runSync(
        `SELECT * FROM tasks WHERE groupId = ?;`,
      );
    });
  });
};

// Update task completion status
export const updateTask = (id: number, done: number) => {
  return new Promise((resolve, reject) => {
    db.withTransactionSync(() => {
      db.runSync(
        `UPDATE tasks SET done = ? WHERE id = ?;`,
      );
    });
  });
};

// Delete a task by ID
export const deleteTask = (id: number) => {
  return new Promise(() => {
    db.withTransactionSync(() => {
      db.runSync(
        `DELETE FROM tasks WHERE id = ?;`,
      );
    });
  });
};
