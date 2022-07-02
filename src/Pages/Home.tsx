import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";


export function Home() {
    const navigate = useNavigate();

    const [name, setName] = useState('');

    const [createSubscribe, { loading }] = useCreateSubscriberMutation()

    async function handleSubscribe(event: FormEvent) {
        event.preventDefault();
        
        await createSubscribe({
            variables: {
                name,
            }
        })
        
        navigate(`/event/lesson/react-crud`)
    }

    
    return (
        <div className="flex flex-col min-h-screen bg-blur bg-cover bg-no-repeat items-center">
            <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto home">
                <div className="max-w-[640px] logo">
                    
                    <h1 className="mt-8 text-[2.4rem] leading-tight title">
                        Bem-Vindo(a) ao meu portifólio com videos de projetos finalizados e em andamento
                    </h1>
                </div>
                <div className="max-w-[400px] p-8 bg-gray-700 border-gray-500 rounded form">
                    <strong className="text-2xl mb-6 block">
                    Olá! Para continuar, digite o seu Nome
                    </strong>

                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
                        <input
                            className="bg-gray-900 rounded px-7 h-14"
                            type="text"
                            placeholder="Seu nome completo"
                            onChange={event => setName(event.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-blue-800 uppercase py-4 rounded font-bold text-sm hover:bg-blue-900 transition-colors disabled:opacity-50"
                        >
                           Inscrever-Se     
                        </button>
                    </form>
                </div>
            </div>

            <img src="/src/Assets/code.png" className="mt-10" alt="" />

        </div>
    );
}