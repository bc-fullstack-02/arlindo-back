import { Link } from "react-router-dom";
import { User, Lock} from "phosphor-react";
import Heading from "../../Components/Heading";
import Text from "../../Components/Text";

import Logo from "../../assets/logo.svg";
import { TextInput } from '../../Components/TextInput';
import Button from "../../Components/Button";
import { FormEvent } from "react";

interface AuthFormProps {
    formTitle: string;
    submitFormButtonText: string;
    submitFormButtonAction: (auth: Auth) => void;
    linkDescription: string;
    routeName: string;
    showNameInput?: boolean;
    }

interface AuthFormElements extends HTMLFormControlsCollection {
    user: HTMLInputElement;
    name?: HTMLAnchorElement;
    password: HTMLInputElement;
}

interface AuthFormElements extends HTMLFormElement {
    readonly elements: AuthFormElements;
}

export interface Auth {
    user: string;
    name?: string;
    password: string;
}

function AuthForm({
    formTitle,
    submitFormButtonText,
    submitFormButtonAction,
    linkDescription,
    routeName,
    showNameInput,
}: AuthFormProps) {
    function handleSubmit(event: FormEvent<AuthFormElements>) {
        event.preventDefault();
        const form = event.currentTarget;        
        
        const auth = {
            user: form.elements.user.value, 
            name: form.elements.name?.value,
            password: form.elements.password.value,
        };
    
        submitFormButtonAction(auth);
    }
    
    return (
        <div className="text-cyan-50 flex flex-col items-center mt-16" >
            <header className="flex flex-col items-center">
                <img src={Logo} alt="logo" />
                <Heading size="lg" className="mt-2">Sysmap Parrot do Arlindo</Heading>
                <Text className="mt-1 opacity-50">{formTitle}</Text>
            </header>

            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-4 items-stretch w-full max-w-sm mt-10"
            >
                {showNameInput && (
                <label htmlFor="name" className="flex flex-col gap-2">
                    <Text>Nome</Text>
                    <TextInput.Root>
                        <TextInput.Icon>
                            <User />
                        </TextInput.Icon>
                        <TextInput.Input 
                            id="name" 
                            type="text" 
                            placeholder="Digite o nome do usuário"
                        />
                    </TextInput.Root>
                </label>
                )}

                <label htmlFor="user" className="flex flex-col gap-2">
                    <Text>Login</Text>
                    <TextInput.Root>
                        <TextInput.Icon>
                            <User />
                        </TextInput.Icon>
                        <TextInput.Input 
                            id="user" 
                            type="text" 
                            placeholder='Digite seu login'
                        />
                    </TextInput.Root>
                </label>

                <label htmlFor="password" className="flex flex-col gap-2">
                    <Text>Senha</Text>
                    <TextInput.Root>
                        <TextInput.Icon>
                            <Lock />
                        </TextInput.Icon>
                        <TextInput.Input 
                            id="password" 
                            type="password" 
                            placeholder='**********'
                        />
                    </TextInput.Root>
                </label>

                <Button type="submit" className="mt-4">
                    {submitFormButtonText}
                </Button>
            </form>
             
            <footer className="flex flex-col items-center gap-4 mt-8">
                <Text asChild size="sm">
                <Link
                    to={routeName}
                    className="underline hover: text-gray-200">
                    {linkDescription}
                    </Link>
                </Text>    
            </footer> 
        </div>
    );
}

export default AuthForm;
