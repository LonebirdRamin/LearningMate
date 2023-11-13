const signIn = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.1.64:5001/api/checkRole?email=${email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      const userRole = result[0].role;
  
      if( userRole === 'student' ) {
        const response = await fetch(`http://192.168.1.64:5001/api/getStudentSchedule?email=${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const resultFinal = await response.json();
        // navigation.navigate('NAVIGATE PAI NAI GOR STORY OF U', { result: resultFinal });
      } else {
        const response = await fetch(`http://192.168.1.64:5001/api/getTeacherSchedule?email=${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const resultFinal = await response.json();
        // navigation.navigate('NAVIGATE PAI NAI GOR STORY OF U', { result: resultFinal });
      }
  
  
    } catch (error) {
      console.error(error);
      alert('Query schedule failed!' + error.message);
    } finally {
      setLoading(false);
    }
  };