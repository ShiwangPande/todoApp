import * as SQLite from 'expo-sqlite/legacy';


export interface Group {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  groupId: number;
  title: string;
  description: string;
  done: boolean;
}


function openDatabase() {
  return SQLite.openDatabase('todo.db');
}

const db = openDatabase();


export const init = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('PRAGMA foreign_keys = ON;');

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS groups (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL
        );`,
        [],
        () => {
       
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS tasks (
              id INTEGER PRIMARY KEY NOT NULL,
              groupId INTEGER,
              title TEXT NOT NULL,
              description TEXT,
              done INTEGER DEFAULT 0,
              FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE CASCADE
            );`,
            [],
            () => resolve(),
            (_, error) => {
              console.error('Error creating tasks table:', error);
              reject(error);
            }
          );
        },
        (_, error) => {
          console.error('Error creating groups table:', error);
          reject(error);
        }
      );
    });
  });
};


export const fetchGroups = (): Promise<Group[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM groups;`,
        [],
        (_, result) => resolve(result.rows._array as Group[]),
        (_, error) => {
          console.error('Error fetching groups:', error);
          reject(error);
        }
      );
    });
  });
};

export const insertGroup = (groupName: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO groups (name) VALUES (?);`,
        [groupName],
        (_, result) => resolve(result.insertId),
        (_, error) => {
          console.error('Error inserting group:', error);
          reject(error);
        }
      );
    });
  });
};


export const fetchTasks = (groupId: number): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tasks WHERE groupId = ?;`,
        [groupId],
        (_, result) => resolve(result.rows._array as Task[]),
        (_, error) => {
          console.error('Error fetching tasks:', error);
          reject(error);
        }
      );
    });
  });
};

export const insertTask = (groupId: number, title: string, description: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    if (!title || title.trim() === '') {
      reject(new Error('Task title cannot be empty.'));
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO tasks (groupId, title, description) VALUES (?, ?, ?);`,
        [groupId, title, description],
        (_, result) => resolve(result.insertId), 
        (_, error) => {
          console.error('Error inserting task:', error);
          reject(error);
        }
      );
    });
  });
};

export const updateTask = (id: number, title: string, description: string, done: boolean): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE tasks SET title = ?, description = ?, done = ? WHERE id = ?;`,
        [title, description, done ? 1 : 0, id],
        () => resolve(),
        (_, error) => {
          console.error('Error updating task:', error);
          reject(error);
        }
      );
    });
  });
};

export const deleteTask = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM tasks WHERE id = ?;`,
        [id],
        () => resolve(),
        (_, error) => {
          console.error('Error deleting task:', error);
          reject(error);
        }
      );
    });
  });
};


export const deleteGroup = async (groupId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(async (tx) => {
    
      tx.executeSql(
        `DELETE FROM tasks WHERE groupId = ?;`,
        [groupId],
        async () => {
     
          tx.executeSql(
            `DELETE FROM groups WHERE id = ?;`,
            [groupId],
            () => resolve(),
            (_, error) => {
              console.error('Error deleting group:', error);
              reject(error);
            }
          );
        },
        (_, error) => {
          console.error('Error deleting tasks before group:', error);
          reject(error);
        }
      );
    });
  });
};
