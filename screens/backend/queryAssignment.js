import { useNavigation } from '@react-navigation/native';

const queryAssignment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://10.4.13.59:5001/api/checkRole?email=${email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      const userRole = result[0].role;
      
      if( userRole === 'student' ) {
        const response = await fetch(`http://10.4.13.59:5001/api/getStudentAssignment?email=${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const assignmentJSON = await response.json();
        // navigation.navigate('NAVIGATE PAI NAI GOR STORY OF U', { result: assignmentJSON });
      } else {
        const response = await fetch(`http://10.4.13.59:5001/api/getTeacherAssignment?email=${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const assignmentJSON = await response.json();
        // navigation.navigate('NAVIGATE PAI NAI GOR STORY OF U', { result: assignmentJSON });
      }
    } catch (error) {
      console.error(error);
      alert('Query assignment failed!' + error.message);
    } finally {
      setLoading(false);
    }
  };

  export default queryAssignment