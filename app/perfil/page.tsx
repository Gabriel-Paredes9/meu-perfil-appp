"use client";

import { useState } from "react";
import UserProfileCard from "@/components/UserProfileCard";
import { fetchUserData } from "@/lib/data";
import { UserProfile } from "@/lib/types";
import styles from "./styles.module.css";

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
        <main className="flex flex-col justify-center items-center min-h-screen bg-[#F4F7F6] p-5">
            <h1 className="text-[#333] mb-8 font-[Segoe_UI,Tahoma,Geneva,Verdana,sans-serif] font-light text-[2.5em]">
                Buscar Perfil de Usuário
            </h1>

            {/* Formulário de Busca */}
            <div className="flex gap-2.5 mb-10 w-full max-w-[500px]">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite o e-mail do usuário"
                    className={styles.searchInput}
                />
                <button
                    onClick={handleSearch}
                    disabled={isLoading || !email} // Desabilita o botão se estiver carregando ou se o input estiver vazio
                    className={`px-5 py-3 rounded-lg text-white text-base font-medium transition-colors duration-200 ${isLoading || !email
                        ? 'bg-[#ccc] cursor-not-allowed'
                        : 'bg-[#0070f3] hover:bg-[#005bb5] cursor-pointer'
                        }`}
                >
                    {isLoading ? 'Buscando...' : 'Buscar'}
                </button>
            </div>

            {/* Área de Resultados */}
            <div className="min-h-[300px] w-full flex flex-col items-center">
                {/* Mostra mensagem de erro, se houver */}
                {error && <p className="text-[#d32f2f] bg-[#ffcdd2] p-4 rounded-lg text-center">{error}</p>}

                {/* Mostra o card do usuário, se os dados foram carregados */}
                {userProfile && <UserProfileCard user={userProfile} />}
            </div>
        </main>
    );
};

export default PerfilPage;