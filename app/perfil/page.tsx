"use client";

import { useState } from "react";
import UserProfileCard from "@/components/UserProfileCard";
import { fetchUserData } from "@/lib/data";
import { UserProfile } from "@/lib/types";
import { Button, Headline, Modal, TextInput } from "@zeiss/beyond-online-react";



const PerfilPage = () => {
    // Estados para controlar o componente
    const [email, setEmail] = useState(''); // Guarda o valor do input
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // Guarda os dados do usuário encontrado
    const [isLoading, setIsLoading] = useState(false); // Controla a exibição de "Carregando..."
    const [error, setError] = useState<string | null>(null); // Guarda mensagens de erro
    const [estaAberto, setEstaAberto] = useState(false);

    const abrirModal = () => setEstaAberto(true);
    const fecharModal = () => setEstaAberto(false);

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

    const handleSearchWithModal = () => {
        handleSearch();
        abrirModal();
    };



    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-100 space-y-4">
                <Headline
                    headline="Buscar Perfil de Usuário"
                    size="l"
                />

                {/* Formulário de Busca */}
                <div className="w-100 space-y-4">
                    <TextInput
                        label="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite o e-mail do usuário"
                    />
                    <Button
                        onClick={handleSearchWithModal}
                        disabled={isLoading || !email} // Desabilita o botão se estiver carregando ou se o input estiver vazio
                        variant="primary"
                    >
                        {isLoading ? 'Buscando...' : 'Buscar'}
                    </Button>
                </div>

                {/* Área de Resultados */}
                <div>
                    <Modal
                        isOpen={estaAberto}
                        onClose={fecharModal}
                    >

                        <div>
                            <Headline
                                headline="Resultado da Busca"
                                size="m"
                            />
                            <p>
                                {error && <p>{error}</p>}
                                {userProfile && <UserProfileCard user={userProfile} />}
                            </p>
                        </div>
                    </Modal>
                </div>


            </div>
        </div>
    );
};

export default PerfilPage;