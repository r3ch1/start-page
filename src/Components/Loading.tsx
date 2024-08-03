import Spinner from 'react-bootstrap/Spinner';
const Loading = ({ isLoading, style }: { isLoading: boolean; style?: any }) => {
  return (
    <>
      {isLoading && (
        <Spinner animation="border" role="status" style={{ ...{ margin: 'auto' }, ...style }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </>
  );
};

export default Loading;
