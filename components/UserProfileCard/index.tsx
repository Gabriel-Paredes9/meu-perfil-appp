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
        <div>
            <div>
                {user.urlphoto &&(
                <Image
                    src={user.urlphoto}
                    alt={`Foto de ${user.nome}`}
                    width={150}
                    height={150}
                />)}
            </div>
            <div>
                <h2 >{user.nome}</h2>
                <p >@{user.login}</p>

                <div >
                    <div >
                        <span >ID:</span>
                        <span>{user.idusuario}</span>
                    </div>
                    <div >
                        <span >CPF:</span>
                        <span>{formatarCPF(user.cpf)}</span>
                    </div>
                    <div >
                        <span >Celular:</span>
                        <span>{user.celular}</span>
                    </div>
                    <div >
                        <span >Nascimento:</span>
                        <span>{formatarData(user.datanascimento)}</span>
                    </div>
                </div>

                <p>
                    Membro desde: {formatarData(user.datahoracriacao)}
                </p>
            </div>
        </div>
    );
};

export default UserProfileCard;