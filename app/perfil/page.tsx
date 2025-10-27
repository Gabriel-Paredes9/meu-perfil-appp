"use client";

import { useState } from "react";
import UserProfileCard from "@/components/UserProfileCard";
import { fetchUserData } from "@/lib/data";
import { UserProfile } from "@/lib/types";
import { Button, Headline } from "@zeiss/beyond-online-react";

const PerfilPage = () => {
    // Estados para controlar o componente
    const [email, setEmail] = useState(''); // Guarda o valor do input
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // Guarda os dados do usuário encontrado
    const [isLoading, setIsLoading] = useState(false); // Controla a exibição de "Carregando..."
    const [error, setError] = useState<string | null>(null); // Guarda mensagens de erro

    // Função chamada quando o botão de busca é clicado
    const handleSearch = async () => {
        // Previne múltiplas chamadas enquanto uma já está em andamento
        if (isLoading) return;

        // Reseta os estados antes de uma nova busca
        setIsLoading(true);
        setUserProfile(null);
        setError(null);

        try {
            // Chama a função de busca com o e-mail do estado
            const data = await fetchUserData(email);
            setUserProfile(data); // Armazena os dados do usuário no estado
        } catch (err: any) {
            setError(err.message); // Armazena a mensagem de erro no estado
        } finally {
            setIsLoading(false); // Para a exibição de "Carregando..."
        }
    };

    return (
        <main>
            <Headline
                headline= "Buscar Perfil de Usuário"
                size="4xl"
            />

            {/* Formulário de Busca */}
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite o e-mail do usuário"
                />
                <Button
                    onClick={handleSearch}
                    disabled={isLoading || !email} // Desabilita o botão se estiver carregando ou se o input estiver vazio
                    variant="primary"
                >
                    {isLoading ? 'Buscando...' : 'Buscar'}
                </Button>
            </div>

            {/* Área de Resultados */}
            <div>
                {/* Mostra mensagem de erro, se houver */}
                {error && <p>{error}</p>}

                {/* Mostra o card do usuário, se os dados foram carregados */}
                {userProfile && <UserProfileCard user={userProfile} />}
            </div>
        </main>
        
    );
};

export default PerfilPage;