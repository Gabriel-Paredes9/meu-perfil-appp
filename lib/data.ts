import { error } from 'console';
import { UserProfile } from './types';

// Esta função simula a busca de dados de um usuário.
/*export const fetchUserData = (): UserProfile => {
  const usuario: UserProfile = {
    idusuario: 1,
    login: 'usuario.teste',
    nome: 'João da Silva',
    foto: 'https://via.placeholder.com/150', // URL de uma imagem de exemplo
    cpf: '12345678900',
    celular: '+55 (21) 98765-4321',
    dataNascimento: '1990-05-15T00:00:00Z',
    dataCriacao: '2023-10-27T10:00:00Z',
  };
  return usuario;
};*/

export const fetchUserData = async (email: string): Promise<UserProfile> => {
    if (!email) {
        throw new Error('O e-mail é obrigatório para a busca.');
    }

    //A URL agora aponta para o aruivo route
    const response = await fetch(`/api?email=${email}`);
    // Se a resposta da nossa API interna não for OK...
    if (!response.ok) {
        // Tenta pegar a mensagem de erro do corpo da resposta
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocorreu um erro na busca.');
    }

    return response.json();
};