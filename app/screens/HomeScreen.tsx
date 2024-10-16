import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TextInput, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchGroups, insertGroup, deleteGroup, Group } from '../db/database';
import GroupItem from '../components/GroupItem';

const HomeScreen = ({ navigation }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const fetchedGroups = await fetchGroups();
      setGroups(fetchedGroups);
    } catch (error) {
      console.error('Failed to fetch groups:', error);
      Alert.alert('Error', 'Failed to load groups. Please try again.');
    }
  };

  const handleAddGroup = async () => {
    if (isAdding) return;
    setIsAdding(true);

    try {
      if (groupName.trim()) {
        await insertGroup(groupName);
        setGroupName('');
        setModalVisible(false);
        loadGroups();
      } else {
        Alert.alert('Error', 'Please enter a group name.');
      }
    } catch (error) {
      console.error('Failed to add group', error);
      Alert.alert('Error', 'Failed to add group. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteGroup = (groupId: number) => {
    Alert.alert('Delete Group', 'Are you sure you want to delete this group and all its todos?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteGroup(groupId);  // Delete group and associated todos
            loadGroups();  // Reload the group list
          } catch (error) {
            console.error('Failed to delete group', error);
            Alert.alert('Error', 'Failed to delete group. Please try again.');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo Groups</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GroupItem
            group={item}
            onSelect={() => navigation.navigate('TodoList', { groupId: item.id })}
            onDelete={handleDeleteGroup}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Group</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Group</Text>
            <TextInput
              placeholder="Enter group name"
              value={groupName}
              onChangeText={setGroupName}
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={handleAddGroup}
            />
            <TouchableOpacity style={styles.createButton} onPress={handleAddGroup} disabled={isAdding}>
              {isAdding ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.createButtonText}>Create Group</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EDEEF0', // Light background color
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2D3748', // Dark text color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for modal
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF', // White background for the modal
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10, // For Android shadow effect
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#4CAF50', // Green color for the title
  },
  input: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#FAFAFA', // Light input background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  createButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#6C757D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default HomeScreen;
