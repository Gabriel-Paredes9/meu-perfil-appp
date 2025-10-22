import { NextResponse } from "next/server";

export async function GET(request: Request) {
    //pega a URL
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    if (!email) {
        return NextResponse.json({ message: 'email obrigatório' }, { status: 400 });
    }

    // Acessa as variáveis de ambiente de forma segura no servidor
    const apiUrl = `${process.env.API_BASE_URL}user/dados/${email}/WEB'`;
    const apiKey = process.env.API_KEY;

    //configurações da request, incluindo a api key
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'x-api-key': `${apiKey}`,
            'Content-Type': 'application/json',
        },
        // importante para não usar cache entre diferentes buscas de usuários
        cache: 'no-store',
    };
    try {
        // A API interna chama a API externa
        const apiResponse = await fetch(apiUrl, options);

        if (!apiResponse.ok) {
            // Repassa o status de erro da API externa para o nosso cliente
            const errorData = await apiResponse.text();
            return NextResponse.json({ message: `Erro da API externa: ${errorData}` }, { status: apiResponse.status });
        }

        const data = await apiResponse.json();

        // Retorna os dados para o nosso Componente de Cliente
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({ message: 'Erro interno ao conectar com a API.' }, { status: 500 });
    }
};