import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const GradeScreen = () => {
  const email = 'phornphat.chan@kmutt.ac.th';
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [grades, setGrades] = useState([]);
  const [gpa, setGpa] = useState(null);

  useEffect(() => {
    queryGrade();
  }, []);

  const queryGrade = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://69.69.69.4:5001/api/getGrades?email=${email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setGrades(result); // Update state with fetched data
      calculateGpa(result); // Calculate GPA
    } catch (error) {
      console.error(error);
      alert('Query grades failed!', error.message);
    } finally {
      setLoading(false);
    }
  }

  const calculateGpa = (grades) => {
    // Implement your GPA calculation logic here
    // Assuming grades have a numeric value, you can calculate the average
    const totalCredits = grades.reduce((total, grade) => total + parseFloat(grade.class_credit), 0);
    const totalGradePoints = grades.reduce((total, grade) => total + (parseFloat(grade.grade) * parseFloat(grade.class_credit)), 0);
    
    const gpa = totalGradePoints / totalCredits;
    setGpa(gpa.toFixed(2)); // Round to two decimal places
  }

  const goBack = () => {
    navigation.goBack();
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20 }}>Class ID: {item.class_id}</Text>
        <Text style={{ fontSize: 20 }}>Class Name: {item.class_name}</Text>
        <Text style={{ fontSize: 20 }}>Grade: {item.grade}</Text>
        <Text style={{ fontSize: 20 }}>Credit: {item.class_credit}</Text>
        <Text style={{ fontSize: 20 }}>Year: {item.class_period_year}</Text>
        <Text style={{ fontSize: 20 }}>Semester: {item.class_period_semester}</Text>
      </View> 
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Go Back" onPress={goBack} containerStyle={{ marginTop: 10, marginBottom: 20 }} />
      {gpa !== null && <Text style={{ fontSize: 20, marginBottom: 10 }}>GPAX: {gpa}</Text>}
      <FlatList
        data={grades}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={queryGrade} // Refresh when the user pulls down
      />
    </View>
  )
}

export default GradeScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center'
  },
});
