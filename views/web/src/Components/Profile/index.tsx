import Heading from "../Heading";
import Text from "../Text";

export interface ProfileProps {

}

export function Profile({}: ProfileProps) {
    return (
        <div>
            <Heading className="border-b border-slate-400 mt-4">
                <Text size="lg" className="font-extrabold ml-5">
                    Perfil
                </Text>
            </Heading>
        </div>
    )
}