import { useEffect, useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';

type Survivor = {
  name: string;
  color: string;
  image: string;
  selected: boolean;
  imageStyle: {};
};

const ZombicideCompanion = () => {
  const [survivors, setSurvivors] = useState<Survivor[]>([]);

  const selectedSurvivor = () => {
    return survivors.find((survivor: Survivor) => survivor.selected);
  };

  const selectSurvivor = (name: string) => {
    if (name === selectedSurvivor()?.name || '') {
      return;
    }
    const _selectedSurvivor = survivors.find((survivor: Survivor) => survivor.name === name);
    if (!_selectedSurvivor) {
      return false;
    }
    const index = survivors.indexOf(_selectedSurvivor);
    const _survivors = survivors.map((survivor: Survivor) => {
      return { ...survivor, selected: false };
    });
    _survivors[index].selected = !_selectedSurvivor.selected;
    setSurvivors(JSON.parse(JSON.stringify(_survivors)));
  };

  useEffect(() => {
    setSurvivors([
      {
        name: 'Clovis',
        color: 'blue',
        image: `${process.env.REACT_APP_PUBLIC_URL}/fClovis-705x594.webp`,
        selected: false,
        imageStyle: { marginLeft: '-190px' },
      },
      {
        name: 'Nelly',
        color: 'red',
        image: `${process.env.REACT_APP_PUBLIC_URL}/fNelly-705x594.webp`,
        selected: false,
        imageStyle: {},
      },
      {
        name: 'Baldric',
        color: 'green',
        image: `${process.env.REACT_APP_PUBLIC_URL}/fBaldric-705x594.webp`,
        selected: false,
        imageStyle: {},
      },
      {
        name: 'Ann',
        color: 'orange',
        image: `${process.env.REACT_APP_PUBLIC_URL}/fAnn-705x594.webp`,
        selected: false,
        imageStyle: {},
      },
      {
        name: 'Samson',
        color: 'purple',
        image: `${process.env.REACT_APP_PUBLIC_URL}/fSamson-705x594.webp`,
        selected: false,
        imageStyle: {},
      },
      {
        name: 'Silas',
        color: 'yellow',
        image: `${process.env.REACT_APP_PUBLIC_URL}/fSilas-705x594.webp`,
        selected: false,
        imageStyle: {},
      },
      {
        name: 'Antha',
        color: 'pink',
        image: `${process.env.REACT_APP_PUBLIC_URL}/fAntha-705x594.webp`,
        selected: false,
        imageStyle: { marginLeft: '-240px' },
      },
    ]);
  }, []);
  return (
    <div className="row">
      <div className="col">
        <Nav variant="underline">
          {survivors.map((survivor: any, i: number) => (
            <Nav.Item>
              <Nav.Link onClick={(e) => selectSurvivor(survivor.name)} style={{ borderColor: survivor.color }}>
                {survivor.name}
              </Nav.Link>
            </Nav.Item>
            // <span key={`survivor-list-${i}`} style={{ borderBottom: `3px solid ${survivor.color}` }}>
            //   {survivor.name}
            // </span>
          ))}
        </Nav>
        <div className="row">
          <div className="col-12" style={{ overflow: 'hidden' }}>
            <img src={selectedSurvivor()?.image} className="w-100" />
          </div>
          <div className="col">dsa</div>
        </div>
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
