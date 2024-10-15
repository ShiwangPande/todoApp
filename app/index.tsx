import React, { useEffect } from 'react';
import { init, fetchGroups, insertGroup }  from './database/database';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TodoListScreen from './screens/TodoListScreen';
import TaskCreationScreen from './screens/TaskCreationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Initialize the database
    init()
      .then(() => {
        console.log('Database initialized');
        // Insert a new group for testing
        return insertGroup('My Group');
      })
      .then(() => {
        return fetchGroups();
      })
      .then((groups) => {
        console.log('Fetched groups:', groups);
      })
      .catch((err) => {
        console.error('Database initialization failed:', err);
      });
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TodoList" component={TodoListScreen} />
        <Stack.Screen name="TaskCreation" component={TaskCreationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
