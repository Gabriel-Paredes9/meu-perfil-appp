"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@zeiss/beyond-online-react';

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
                router.push('/perfil');
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
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>

                {/* Campo de login */}
                <div>
                    <label htmlFor="login">login</label>
                    <input
                        id="login"
                        type="email"
                        value={login}
                        onChange={(e) => setlogin(e.target.value)}
                        required
                    />
                </div>

                {/* Campo de Senha */}
                <div>
                    <label htmlFor="pass">Senha</label>
                    <input
                        id="pass"
                        type="password"
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