import { useState, useEffect } from 'react';

function Contador() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-4xl font-bold text-center my-8">
      Contador: {count}
    </div>
  );
}

export default Contador;
