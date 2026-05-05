import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'

import {useForm} from 'react-hook-form';
import { useMember } from '../hooks/useMember';

const Registration = () => {
    let memberRole = 0;

    const { register, handleSubmit } = useForm();
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
                        {...register("name")}
                    />
                </FloatingLabel>
                <FloatingLabel label='sobrenome'>
                    <Form.Control
                        type='text'
                        placeholder='sobrenome'
                        {...register("surname")}
                    />
                </FloatingLabel>
                <FloatingLabel label='matrícula'>
                    <Form.Control
                        type='text'
                        placeholder='matrícula'
                        {...register("enrollment")}
                    />
                </FloatingLabel>
                <Form.Select onChange={(e)=>memberRole = e.target.value}>
                    <option value="0">Colab</option>
                    <option value="1">Gestor</option>
                    <option value="2">Diretor</option>
                </Form.Select>
                <Button type='submit'>Cadastrar</Button>
            </Form>
        </div>
    )
}

export default Registration