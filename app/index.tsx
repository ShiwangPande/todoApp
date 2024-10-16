import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import TodoListScreen from './screens/TodoListScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import TaskCreationScreen from './screens/TaskCreationScreen';
import { init } from './db/database';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await init();
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Failed to initialize database', error);
      }
    };

    initializeDatabase();
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerLeft: () => (
              <Icon
                name={Platform.OS === 'android' ? 'home' : 'home'}
                size={24}
                color="#fff"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="TodoList"
          component={TodoListScreen}
          options={{
            title: 'Todo List',
            headerLeft: () => (
              <Icon
                name={Platform.OS === 'android' ? 'list' : 'list'}
                size={24}
                color="#fff"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={{
            title: 'Task Details',
            headerLeft: () => (
              <Icon
                name={Platform.OS === 'android' ? 'information-circle' : 'information-circle'}
                size={24}
                color="#fff"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="TaskCreation"
          component={TaskCreationScreen}
          options={{
            title: 'Task Creation',
            headerLeft: () => (
              <Icon
                name={Platform.OS === 'android' ? 'add-circle' : 'add-circle'}
                size={24}
                color="#fff"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
