const WindDirection = ({ degree }) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degree / 45) % 8;
  
  return (
    <div className="text-center">
      <p className="text-sm opacity-70">Wind Direction</p>
      <p className="text-xl">{directions[index]}</p>
    </div>
  );
}; 