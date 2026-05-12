import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'

import PasswordForm from './PasswordForm.jsx';
import MemberRoleSelection from '../MemberRoleSelect.jsx';

import Field from '../subcomponent/Field.jsx';

import { useMember } from '../../../hooks/useMember.js';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

const EditMemberForm = ({enrollment}) => {
    const { register, handleSubmit, setValue } = useForm();
    const { editMember, member } = useMember();
    const [roleSelected, setRoleSelected] = useState('');

    const [memberData, setMemberData] = useState({
        member_name:'',
        member_surname:'', 
        member_enrollment:'', 
        member_password:'', 
        member_role:'',
        is_first_access:''
    });

    const [member_name, setMemberName] = useState(memberData.member_name)
    const [member_surname, setMemberSurname] = useState(memberData.member_surname)
    const [member_enrollment, setMemberEnrollment] = useState(memberData.member_enrollment)
    const [member_password, setMemberPassword] = useState('')
    const [member_role, setMemberRole] = useState(memberData.member_role);

    const handleChangePassword = (data) => {
    }

    const handleOnBlur = (data) => console.log(data);

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
            setMemberData(data);
            
            for (const [key, value] of Object.entries(data)){
                setValue(key, value);
            }
            setValue("member_enrollment", enrollment);
            setRoleSelected(data.member_role);
        };
        fetchData();
    }, []);
    const onRoleChange = (data) => setRoleSelected(data);

  return (
    <div>
        {(memberData.member_enrollment == enrollment && memberData.member_role != 0) &&
            <div>    
                <MemberRoleSelection onChange={onRoleChange}/>
                <Field 
                    onBlur={handleOnBlur} defaltValue={member_name} 
                    type={'text'} label={'nome'} placeholder={'nome'}/>
                <Field 
                    onBlur={handleOnBlur} defaltValue={member_surname} 
                    type={'text'} label={'sobrenome'} placeholder={'sobrenome'}/>
                <Field 
                    onBlur={handleOnBlur} defaltValue={member_enrollment} 
                    type={'text'} label={'matrícula'} placeholder={'matrícula'}/>
            </div>
        }
        
        { (memberData.is_first_access == 1) && 
            <div>
                <Field 
                    onBlur={handleOnBlur} defaltValue={''} 
                    type={'password'} label={'senha'} placeholder={'senha'}/>
                    
                <Field 
                    onBlur={handleOnBlur} defaltValue={''} 
                    type={'password'} label={'confirmar senha'} placeholder={'confirmar senha'}/>
            </div>
        }

        <Button>Enviar</Button>


        {/* {(memberData.is_first_access == '1') 
            ? <PasswordForm/> 
            : (memberData.member_enrollment == enrollment) && EditForm
        } */}
    </div>
  )
}

export default EditMemberForm