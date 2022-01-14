const isometricCalc = (x, y) => {
  var isoX = x - y;
  var isoY = (x + y) / 1.735;
  return { x: isoX, y: isoY, zIndex: y };
};

export default isometricCalc;
