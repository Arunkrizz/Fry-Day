import Card from 'react-bootstrap/Card';

function BgColorExample(props) {
  return (
    <>
      {[
        // 'Primary',
        // 'Secondary',
        // 'Success',
        // 'Danger',
        // 'Warning',
        // 'Info',
        'Light',
        // 'Dark',
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem' ,marginRight:"60px"}}
          className="mb-2"
        >
          
          <Card.Body >
            <Card.Title style={{ color:"blue" }}> {props.value} </Card.Title>
            <Card.Text>
              {props.value2}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default BgColorExample;