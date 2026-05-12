import { useMember } from './useMember';
import { useSession } from './useSession';

import { useState } from 'react';

const { auth, member, clearLocalStorage, populateLocalStorage } = useMember();
const { logout, newSession, session } = useSession();

export function handleAccess(){
    const authentication = async(data) => {
        const isValidMember = await auth(data);
        if(!isValidMember){
            alert('Membro invalido');
            return false;
        }
        return true;
    }

    const handleLogin = async (credential) => {
        const isAuth = await authentication(credential);
        if(! isAuth){
            location.reload();
            return;
        }
        const {enrollment} = credential;
        const isNewSession = await newSession(enrollment);
        if(!isNewSession){
            alert('Erro ao logar');
            return
        }
        const {is_first_access, member_role} = await member(enrollment);
        populateLocalStorage(enrollment, member_role, is_first_access);
        const data = {isLogged: true, member_role, is_first_access, enrollment}
        return data;
    }

    const handleLogout = async (data) => {
        const isAuth = await authentication(data);
        if(! isAuth){
            location.reload();
            return;
        }
        const {enrollment} = data;
        const isOut = await logout(enrollment);
        if(!isOut){
            alert('Erro ao deslogar')
            return false;
        }
        clearLocalStorage();
        return isOut;
    }

    return {handleLogin, handleLogout}
}