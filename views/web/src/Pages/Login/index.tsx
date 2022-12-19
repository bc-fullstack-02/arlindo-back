import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import AuthForm, { Auth } from "../../Components/AuthForm";
import api from '../../services/api';

interface UserToken {
    profile: string;
    user: string;
}
function Login() {
    const navigate = useNavigate();

    async function handleLogin(auth: Auth) {
        try { 
            const { data } = await api.post("/login", auth);

            //TO-DO Tem que corrigir o retorno do token pois so retona do backend um string ao inves de ser o objeto UserToken!!! 
            const decodedToken = jwt_decode(data.accessToken) as UserToken;            

            // localStorage.setItem ("profile", decodedToken.profile);
            localStorage.setItem("user", decodedToken.user);
            localStorage.setItem("accessToken", data.accessToken); 
            localStorage.setItem("userInfo", JSON.stringify(data.user))
           
            //const decodedToken = parseJwt(data.data.accessToken) as UserToken;

            //localStorage.setItem ("user", decodedToken.user);
            //localStorage.setItem ("accessToken", data.data.accessToken); 
            
            return navigate("/home");
        }   catch (err) {
            console.error(err);
            alert("Ocorreu um erro no login");
        }           
    }

    // https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
    function parseJwt (token: string) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return { profile: '', user: jsonPayload} as UserToken;
    }

    return (
        <AuthForm
        formTitle="Faça login e começe a usar!"
        submitFormButtonText="Entrar"
        submitFormButtonAction={handleLogin}
        linkDescription="Não possui conta? Cria uma agora!"
        routeName="signup"
        />
    );
}

export default Login;
