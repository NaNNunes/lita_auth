import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'

import {useForm} from 'react-hook-form';
import { useMember } from '../hooks/useMember';
import { useState } from 'react';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { newAccess } = useMember();

  const [isLogged, setIsLogged] = useState(false);

  const onSubmit = async (data) => {
    let memberData = {member_role: '0'} 
    if(!isLogged) {
      memberData = await newAccess(data);
      console.log(memberData);
      if(memberData.member_role === '0'){
        setIsLogged(true);
      }
    }

    if(isLogged){
      logout(data);
    }
  }
  const onErrors = (error) => console.log(error);
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <FloatingLabel label='matrícula'>
          <Form.Control
            type='text'
            placeholder='matrícula'
            {...register("enrollment")}
          />
        </FloatingLabel>
        <FloatingLabel label='senha'>
          <Form.Control
            type='password'
            placeholder='senha'
            {...register("password")}
          />
        </FloatingLabel>
        <Button 
          type='submit' 
          as="input" 
          value={(isLogged) ? "Logout" : "Login"} 
          variant={(isLogged) ? "danger" : "primary"}
        />
      </Form>
    </div>
  )
}

export default Login