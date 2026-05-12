import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'

const Field = 
({ onBlur, 
    type = 'text', 
    label = 'field', 
    placeholder = 'placeholder',
    defaltValue = ''
  }) => 
{
  return (
    <div>
      <FloatingLabel label={label}>
        <Form.Control
          defaultValue={defaltValue}
          type={type}
          placeholder={placeholder}
          onBlur={(e)=>onBlur(e.target.value)}/>
      </FloatingLabel>
    </div>
  )
}

export default Field