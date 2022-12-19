import { useNavigate } from 'react-router-dom';
import AuthForm, { Auth } from "../../Components/AuthForm";
import api from '../../services/api';

function SignUp() {
    const navigate = useNavigate();

    async function handleRegister(auth: Auth) {
        try {
            await api.post("/users", auth);
          navigate("/");     
        } catch (err){
          alert("Erro na criação do usuário.")  
        }
    }
    return (
        <AuthForm
            formTitle="Faça o cadastro e começe a usar!"
            submitFormButtonText="Cadastrar"
            submitFormButtonAction={handleRegister}
            linkDescription="Já possui conta? Entre agora!"
            routeName="/"
            showNameInput
        />
    );
}

export default SignUp;