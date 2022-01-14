export default (array) => {
  return array[Math.round(Math.random() * (array.length - 0.5))];
};
