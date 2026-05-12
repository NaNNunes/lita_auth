import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'

import { useForm } from 'react-hook-form';

const LoginForm = ({handleLogin, handleLogout, isLogged}) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) =>{
        if(!isLogged) {
            handleLogin(data);
            return;
        }
        handleLogout(data);
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

export default LoginForm