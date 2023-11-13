// const currentDate = new Date();
// currentDate.setHours(currentDate.getHours() + 7)

// // Format the date as a string with time set to 00:00:00
// const initialDate = currentDate.toISOString().split('T')[0] + ' 00:00:00';
// currentDate.setHours(currentDate.getHours() + 24)
// const endDate = currentDate.toISOString().split('T')[0] + ' 00:00:00';

// console.log(initialDate);
// console.log(endDate);

const inputArray = [64070503471, 64070503433, 64070503442, 64070503454];
const constantValue = 'CPE334';

const outputArray = inputArray.map(num => [constantValue, num.toString()]);

console.log(outputArray)
// outputArray.forEach(item => {
//     console.log(`{ '${item[0]}', '${item[1]}' }`);
// });