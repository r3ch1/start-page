import useGoogleSheets from 'use-google-sheets';

const EscalaFintools = () => {
  const { loading, error } = useGoogleSheets({
    apiKey: 'AIzaSyBNkc71twpgu-UB3tSo1L5GnFsEztHf4mc',
    sheetId: '1M4RyB67sc4aIeyj23-fW6eCLujHpH13Rr6dBK4Uzdlo',
  });

  if (loading) {
    // return <div>Loading...</div>;
  }

  if (error) {
    // return <div>Error!</div>;
  }

  // return <div>{JSON.stringify(data)}</div>;
  return (
    <>
      <div>I am Working</div>
      <i className="fa-solid fa-person fa-6x" />
      <i className="fa-solid fa-person-digging fa-6x" />
      <i className="fa-solid fa-person fa-6x" />
    </>
  );
};

export default EscalaFintools;
