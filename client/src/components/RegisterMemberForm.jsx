import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'

import { useMember } from '../hooks/useMember';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const RegisterMemberForm = () => {
    const [roleOptions, setRoleOptions] = useState([
        {id: 0, value: 'Colab'},
        {id: 1, value: 'Gestor'},
        {id: 2, value: 'Diretor'}
    ])
    const [roleSelected, setRoleSelected] = useState('');
    const { register, handleSubmit, setValue } = useForm();
    const { newMember } = useMember();
    const onSubmit = async (data) => {
        newMember({...data, 'role' : memberRole});
    }
    const onErrors = (error) => console.log(error);
  return (
    <div>
        <Form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <FloatingLabel label='nome'>
                <Form.Control
                    type='text'
                    placeholder='nome'
                    {...register("member_name")}
                />
            </FloatingLabel>
            <FloatingLabel label='sobrenome'>
                <Form.Control
                    type='text'
                    placeholder='sobrenome'
                    {...register("member_surname")}
                />
            </FloatingLabel>
            <FloatingLabel label='matrícula'>
                <Form.Control
                    type='text'
                    placeholder='matrícula'
                    {...register("member_enrollment")}
                />
            </FloatingLabel>
            <FloatingLabel label='password'>
                <Form.Control
                    type='password'
                    placeholder='senha'
                    {...register("password")}
                />
            </FloatingLabel>
            <Form.Select 
                value={roleSelected}
                onChange={ (e)=> setRoleSelected(e.target.value.toString())}>
                <option value="" disabled>Cargo</option>
                {roleOptions.map((option)=> (
                    <option key={option.id} value={option.id}>
                        {option.value}
                    </option>
                ))}
            </Form.Select>
            <Button type='submit'>Cadastrar</Button>
        </Form>
    </div>
  )
}

export default RegisterMemberForm