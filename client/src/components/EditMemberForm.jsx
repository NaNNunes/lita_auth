import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'

import { useMember } from '../hooks/useMember';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

const EditMemberForm = ({enrollment}) => {
    
    const { register, handleSubmit, setValue } = useForm();
    const { editMember, member } = useMember();
    const [memberData, setMemberData] = useState({
        member_name:'',
        member_surname:'', 
        member_enrollment:'', 
        member_password:'', 
        member_role:''
    });
    const [roleOptions, setRoleOptions] = useState([
        {id: 0, value: 'Colab'},
        {id: 1, value: 'Gestor'},
        {id: 2, value: 'Diretor'}
    ])
    const [roleSelected, setRoleSelected] = useState('');

    const onSubmit = async (data) => {
        let isConfirmed = confirm(`tem certeza que deseja modificar esses dados?`);
        if(isConfirmed){
            await editMember({...data, member_role: roleSelected}, enrollment);
        }
    }
    const onErrors = (error) => console.log(error);

    useEffect(()=>{
        async function fetchData(){
            const data = await member(enrollment);
            setMemberData(memberData);
            for (const [key, value] of Object.entries(data)){
                setValue(key, value);
            }
            setValue("member_enrollment", enrollment);
            setRoleSelected(data.member_role);
        };
        fetchData();
    }, []);


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
            <Button type='submit'>Editar</Button>
        </Form>
    </div>
  )
}

export default EditMemberForm