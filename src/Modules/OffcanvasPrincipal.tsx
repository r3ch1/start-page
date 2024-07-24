import Offcanvas from 'react-bootstrap/Offcanvas';
import ZombicideCompanion from './ZombicideCompanion';

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
  const routes = [{ path: '', name: 'zombicide', module: <ZombicideCompanion /> }];

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
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{getBody()}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasPrincipal;
