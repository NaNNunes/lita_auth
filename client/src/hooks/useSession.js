const url = import.meta.env.VITE_LOCAL_API;
export function useSession(){

    const session = async (enrollment) => {
        const res = await fetch(`${url}/sessions/${enrollment}`);
        if(!res.ok && res.status != 404){
            throw new Error(await res.json());
        }
        if(res.status == 404){
            return false;
        }
        const data = await res.json();
        const {day_date} = data.result;
        const now = new Date().toISOString().split("T")[0];
        if(now != day_date.split("T")[0]){
            console.log(now);
            console.log(day_date.split("T")[0]);
            return false;
        }
        return true;
    }

    const newSession = async (enrollment) => {
        const data = {enrollment};
        const options = {
            "method": "POST",
            "headers": {"Content-Type":"application/json" },
            "body": JSON.stringify(data)
        }
        const res = await fetch(`${url}/sessions/new`, options);
        return await res.ok;
    }

    const logout = async (enrollment) => {
        const data = {enrollment};
        const options = {
            "method": "PATCH",
            "headers": {"Content-Type":"application/json" },
            "body": JSON.stringify(data)
        }
        const res = await fetch(`${url}/sessions/logout`, options);
        console.log(await res.json());
        return res.ok;
    }

    return {newSession, logout, session}
}