import { useEffect, useState } from 'react';
import Stack from 'react-bootstrap/Stack';

const ZombicideCompanion = () => {
  const [survivors, setSurvivors] = useState([]) as any[];

  useEffect(() => {
    setSurvivors([
      { name: 'Clovis', color: 'blue' },
      { name: 'Nelly', color: 'red' },
      { name: 'Baldric', color: 'green' },
      { name: 'Ann', color: 'orange' },
      { name: 'Samson', color: 'purple' },
      { name: 'Silas', color: 'yellow' },
    ]);
  }, []);
  return (
    <div className="row">
      <div className="col">
        <Stack direction="horizontal" gap={2}>
          {survivors.map((survivor: any, i: number) => (
            //   <span className="badge rounded-pill" style={{ backgroundColor: survivor.color }}>
            //     {survivor.name}
            //   </span>
            //   <Badge pill style={{ backgroundColor: survivor.color + '!important' }}>
            //     {survivor.name}
            //   </Badge>
            <span key={`survivor-list-${i}`} style={{ borderBottom: `3px solid ${survivor.color}` }}>
              {survivor.name}
            </span>
          ))}
        </Stack>
      </div>
    </div>
  );
};
export default ZombicideCompanion;
