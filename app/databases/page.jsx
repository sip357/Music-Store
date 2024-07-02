import { useEffect, useState } from 'react';

const Databases = () => {
  const [databases, setDatabases] = useState([]);

  useEffect(() => {
    const fetchDatabases = async () => {
      const response = await fetch('/api/list-databases');
      const data = await response.json();
      setDatabases(data.databases);
    };

    fetchDatabases();
  }, []);

  return (
    <div>
      <h1>Databases</h1>
      <ul>
        {databases.map((db) => (
          <li key={db.name}>{db.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Databases;
