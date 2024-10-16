import * as SQLite from 'expo-sqlite/legacy';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
function openDatabase(){
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }
  const db = SQLite.openDatabase("todo.db");
  return db;
}

// Open or create a SQLite database
const db=openDatabase();


// Initialize the database
export const init = () => {

  return new Promise<void>((resolve, reject) => {
    db.transaction(async (tx) => {
      // Create groups table
      await tx.executeSql(
        `CREATE TABLE IF NOT EXISTS groups (
           id INTEGER PRIMARY KEY NOT NULL,
           name TEXT NOT NULL
         );`,
        [],
        (tx) => {
          // Create tasks table after creating groups
          tx.executeSql(
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
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO groups (name) VALUES (?);`,
      );
    });
  });
};

// Fetch all groups
export const fetchGroups = () => {
  return new Promise(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM groups;`,
      );
    });
  });
};

// Insert a new task
export const insertTask = (title: string, description: string, groupId: number) => {
  return new Promise(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO tasks (title, description, done, groupId) VALUES (?, ?, 0, ?);`,
      );
    });
  });
};

// Fetch tasks by group ID
export const fetchTasks = (groupId: number) => {
  return new Promise(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tasks WHERE groupId = ?;`,
      );
    });
  });
};

// Update task completion status
export const updateTask = (id: number, done: number) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE tasks SET done = ? WHERE id = ?;`,
      );
    });
  });
};

// Delete a task by ID
export const deleteTask = (id: number) => {
  return new Promise(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM tasks WHERE id = ?;`,
      );
    });
  });
};