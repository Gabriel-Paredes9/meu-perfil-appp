import NextAuth from 'next-auth';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                login: { label: "login", type: "email" },
                pass: { label: "pass", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.login || !credentials?.pass) {
                    throw new Error("Email e senha são obrigatórios.");
                }

                const API_KEY = process.env.API_KEY;
                const API_URL = process.env.API_AUTHBASE_URL;

                console.log("--- DEBUG NEXTAUTH ---");
                console.log(`Tentativa de login para: ${credentials.login}`);
                console.log(`Chamando API: ${API_URL}`);
                console.log(`Com x-api-key: ${API_KEY ? 'Sim' : 'Não'}`);

                try {
                    const res = await fetch(`${API_URL}auth/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': `${API_KEY}`,
                        },
                        body: JSON.stringify({
                            login: credentials.login,
                            pass: credentials.pass,
                        }),
                    });

                    console.log(`Status da Resposta da API: ${res.status}`);

                    // Se a API não for OK (4xx ou 5xx)
                    if (!res.ok) {
                        const errorText = await res.text(); // Use .text() antes para evitar falha no .json()
                        console.error("Erro na API de Autenticação:", errorText);

                        // Tenta dar parse no JSON, mas usa o texto se falhar
                        try {
                            const errorData = JSON.parse(errorText);
                            throw new Error(errorData.message || "Credenciais inválidas. (Resposta da API)");
                        } catch {
                            throw new Error(`Erro desconhecido da API. Status: ${res.status}`);
                        }
                    }

                    // Se a API for OK (2xx)
                    const data = await res.json();
                    console.log("Resposta de Sucesso da API (data):", data);

                    const user = data;

                    if (user) {
                        console.log("Login SUCESSO. Usuário");
                        return {
                            idusuario: user.idusuario,
                            nome: user.nome,
                            login: user.login,
                            ...user
                        };
                    } else {
                        console.error("Login FALHA: API retornou 200, mas sem user/token.");
                        // Retornar null também dispara o "CredentialsSignin"
                        return null;
                    }

                } catch (e: any) {
                    console.error("Erro no Bloco Catch (Rede/Fetch):", e.message);
                    throw new Error(`Erro na conexão com o servidor de autenticação: ${e.message}`);
                }
            }
        })
    ],
    // ... resto da configuração
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        // Este callback é chamado sempre que um JWT é criado (no login) ou atualizado
        async jwt({ token, user }) {
            // No primeiro login, o objeto 'user' (retornado pelo authorize) está disponível
            if (user) {


                return { ...token, ...user };
            }
            return token;
        },

        // Este callback é chamado sempre que uma sessão é acessada (ex: useSession, getServerSession)
        async session({ session, token }) {
            // Disponibiliza o accessToken para o lado do cliente
            session.user = token as any;
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };