import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import GroupList from '../components/GroupList';
import { getGroups } from '../database/database';

const HomeScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    try {
      const groupsData = await getGroups();
      setGroups(groupsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Add Group" onPress={() => navigation.navigate('TaskCreation')} />
      <GroupList groups={groups} onSelectGroup={(groupId) => navigation.navigate('TodoList', { groupId })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default HomeScreen;
