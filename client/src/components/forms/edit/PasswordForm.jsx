import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'

import { useForm } from 'react-hook-form';

const PasswordForm = ({enrollment, handleChangePassword}) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
      const {member_password, confirmPassword} = data;
      if(member_password != confirmPassword){
        alert('Senhas não são iguais');
        return;
      }
      
      handleChangePassword(member_password);      
    }
    const onErrors = (error) => console.log(error);
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <FloatingLabel label='password'>
            <Form.Control
                type='password'
                placeholder='senha'
                {...register("member_password")}
            />
        </FloatingLabel>
        <FloatingLabel label='Confirmar senha'>
            <Form.Control
                type='password'
                placeholder='Confirmar senha'
                {...register("confirmPassword")}
            />
        </FloatingLabel>
        <Button type='submit'>Editar</Button>
      </Form>
    </div>
  )
}

export default PasswordForm