import LoginForm from '../components/forms/LoginForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAccess } from '../hooks/handleAccess';
import { useSession } from '../hooks/useSession';
import { useMember } from '../hooks/useMember';

const Login = () => {
  const { member } = useMember();
  const { handleLogin, handleLogout } = handleAccess();
  const { session } = useSession();
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const login = async (credential) => {
    const data = await handleLogin(credential);
    setIsLogged(true);
    handleNavigate(data);
  }
  const logout = async (credential) => {
    const isOut = await handleLogout(credential);
    setIsLogged(!isOut);
    location.reload();
  }

  const handleNavigate = (data = {isLogged : false, member_role : 0, is_first_access : 0, member_enrollment : ""}) => {
    console.log(data.isLogged)
    if(! data.isLogged) return;
    console.log(data.is_first_access == 1);
    if(data.is_first_access == 1){
      console.log(data.member_enrollment)
      navigate(`/member/${data.member_enrollment}`);
      return;
    }
    if(data.member_role != "0"){
      navigate("/home");
      return;
    }
  }

  useEffect(()=>{
    async function fetchData(){
      const enrollment = localStorage.getItem("member-enrollment");
      const isLogged = await session(enrollment);
      setIsLogged(isLogged);
      if(!isLogged) return;
      const data = await member(enrollment);
      if(!data)return
      handleNavigate({...data, isLogged: true});
      // criar um context
    }
    fetchData();
  },[]);
  
  return (
    <div>
      <LoginForm 
        handleLogin={login} 
        handleLogout={logout} 
        isLogged={isLogged}/>
    </div>
  )
}

export default Login