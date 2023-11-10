const currentDate = new Date();
currentDate.setHours(currentDate.getHours() + 7)

// Format the date as a string with time set to 00:00:00
const initialDate = currentDate.toISOString().split('T')[0] + ' 00:00:00';
currentDate.setHours(currentDate.getHours() + 24)
const endDate = currentDate.toISOString().split('T')[0] + ' 00:00:00';

console.log(initialDate);
console.log(endDate);