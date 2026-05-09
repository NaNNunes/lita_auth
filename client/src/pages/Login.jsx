import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'

import { useForm } from 'react-hook-form';
import { useMember } from '../hooks/useMember';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login, member, logout } = useMember();
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    login(data);
    const memberData = await member(data.enrollment);
    // const memberRole = localStorage.getItem("memberRole");
    setIsLogged(true);
    if(memberData.is_first_access == 1){
      navigate("");
    }

    if(memberData.memberRole != "0"){
      navigate("/home");
    }
  }

  const onSubmit = async (data) => {
    if(!isLogged) {
      handleLogin(data);
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