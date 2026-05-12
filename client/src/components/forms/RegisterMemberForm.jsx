import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'

import MemberRoleSelection from './MemberRoleSelect';

import { useMember } from '../../hooks/useMember';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const RegisterMemberForm = () => {
    const [roleSelected, setRoleSelected] = useState('');
    const { register, handleSubmit, setValue } = useForm();
    const { newMember } = useMember();
    const onSubmit = async (data) => {
        console.log(data)
        newMember({...data, 'member_role' : roleSelected});
    }
    const onErrors = (error) => console.log(error);
    const onRoleChange = (data) => setRoleSelected(data);

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
                    {...register("member_password")}
                />
            </FloatingLabel>
            <MemberRoleSelection onChange={onRoleChange}/>
            <Button type='submit'>Cadastrar</Button>
        </Form>
    </div>
  )
}

export default RegisterMemberForm