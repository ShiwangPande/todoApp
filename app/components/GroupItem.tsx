import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; 

const GroupItem = ({ group, onSelect, onDelete }) => {
  const fadeAnim = new Animated.Value(1);

  const confirmDelete = () => {
    Alert.alert(
      'Delete Group',
      `Are you sure you want to delete the group "${group.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            fadeOut();
            onDelete(group.id);
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <TouchableOpacity onPress={onSelect} style={styles.groupButton}>
        <Text style={styles.groupName}>{group.name}</Text>
        <MaterialIcons name="arrow-forward-ios" size={20} color="#777" />
      </TouchableOpacity>
      <TouchableOpacity onPress={confirmDelete} style={styles.deleteButton}>
        <LinearGradient
          colors={['#D32F2F', '#B71C1C']} 
          style={styles.gradientBackground}
        >
          <View style={styles.deleteButtonContent}>
            <MaterialIcons name="delete" size={20} color="#FFFFFF" />
            <Text style={styles.deleteButtonText}>Delete</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  groupButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#E7F9FE',
    borderColor: '#D1E4F2',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    borderRadius: 20,
  },
  gradientBackground: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  deleteButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default GroupItem;
