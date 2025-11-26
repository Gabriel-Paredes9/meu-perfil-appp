"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Headline, Password, TextInput } from '@zeiss/beyond-online-react';

const LoginPage = () => {
    const [login, setlogin] = useState('');
    const [pass, setpass] = useState(''); // <-- Adicionar estado para a senha
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                redirect: false,
                login: login,
                pass: pass, // <-- Enviar a senha para o NextAuth
            });

            if (result?.ok) {
                router.push('/usuario');
            } else {
                // A mensagem de erro virá diretamente do NextAuth
                setError(result?.error || 'Credenciais inválidas.');
            }
        } catch (error) {
            setError("Ocorreu um erro ao tentar fazer login.");
        }

        setIsLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={handleSubmit} className='w-100 space-y-4'>
                <Headline
                    headline="Faça seu Login"
                    size="l"
                    className="text-center"
                />


                {/* Campo de login */}
                <div>
                    <TextInput
                        label="Login"
                        id="login"
                        type="email"
                        helperText="Digite seu e-mail"
                        value={login}
                        onChange={(e) => setlogin(e.target.value)}
                        required
                    />
                </div>

                {/* Campo de Senha */}
                <div>
                    <Password
                        label="Senha"
                        id="pass"
                        type="password"
                        autoComplete="off"
                        helperText="Digite sua senha"
                        value={pass}
                        onChange={(e) => setpass(e.target.value)}
                        required
                    />
                </div>


                {error && <p>{error}</p>}
                <Button
                    type="submit"
                    disabled={isLoading}
                    variant="primary"
                >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
            </form>
        </div>
    );
};

export default LoginPage;