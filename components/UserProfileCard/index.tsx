import Image from 'next/image';
import { UserProfile } from '@/lib/types';

// Funções de formatação (sem alteração)
const formatarData = (data: string) => new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(data));
const formatarCPF = (cpf: string) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

type UserProfileCardProps = {
    user: UserProfile;
};

const UserProfileCard = ({ user }: UserProfileCardProps) => {

    return (
        <div className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-lg">
            <div className="mb-4">
                {user.urlphoto &&(
                <Image
                    src={user.urlphoto}
                    alt={`Foto de ${user.nome}`}
                    width={150}
                    height={150}
                    className="mx-auto rounded-full border-4 border-gray-200"
                />)}
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.nome}</h2>
                <p className="mb-6 text-gray-500">@{user.login}</p>

                <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="info-item">
                        <span className="block text-sm font-bold text-gray-600">ID:</span>
                        <span>{user.idusuario}</span>
                    </div>
                    <div className="info-item">
                        <span className="block text-sm font-bold text-gray-600">CPF:</span>
                        <span>{formatarCPF(user.cpf)}</span>
                    </div>
                    <div className="info-item">
                        <span className="block text-sm font-bold text-gray-600">Celular:</span>
                        <span>{user.celular}</span>
                    </div>
                    <div className="info-item">
                        <span className="block text-sm font-bold text-gray-600">Nascimento:</span>
                        <span>{formatarData(user.datanascimento)}</span>
                    </div>
                </div>

                <p className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-500">
                    Membro desde: {formatarData(user.datahoracriacao)}
                </p>
            </div>
        </div>
    );
};

export default UserProfileCard;