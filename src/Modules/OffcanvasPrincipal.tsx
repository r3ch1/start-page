import Offcanvas from 'react-bootstrap/Offcanvas';
import ZombicideCompanion from './ZombicideCompanion';
import EscalaV2Fintools from './EscalaV2Fintools';

const OffcanvasPrincipal = ({
  children,
  isOpen,
  toogle,
  body,
}: {
  children?: any;
  isOpen: boolean;
  toogle?: any;
  body: string;
}) => {
  const routes = [
    { path: '', name: 'zombicide', module: <ZombicideCompanion /> },
    { path: '', name: 'escala', module: <EscalaV2Fintools fullContent={true} /> },
  ];

  const getBody = () => {
    if (children) return children;
    return <>{routes.find((item: any) => item.name === body)?.module}</>;
  };

  return (
    <Offcanvas
      show={isOpen}
      onHide={() => toogle()}
      {...{
        scroll: true,
        backdrop: false,
        placement: 'end',
        className: 'more-info',
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{routes.find((item: any) => item.name === body)?.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{getBody()}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasPrincipal;
