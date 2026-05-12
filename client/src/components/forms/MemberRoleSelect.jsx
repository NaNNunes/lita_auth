import Form from 'react-bootstrap/Form'
import {useState} from 'react'

const MemberRoleSelection = ({role, onChange}) => {
    const [roleOptions, setRoleOptions] = useState([
        {id: 0, value: 'Colab'},
        {id: 1, value: 'Gestor'},
        {id: 2, value: 'Diretor'}
    ])

  return (
    <div>
        <Form.Select 
            value={role}
            onChange={ (e)=> onChange(e.target.value.toString())}>
            <option value="" disabled>Cargo</option>
            {roleOptions.map((option)=> (
                <option key={option.id} value={option.id}>
                    {option.value}
                </option>
            ))}
        </Form.Select>
    </div>
  )
}

export default MemberRoleSelection