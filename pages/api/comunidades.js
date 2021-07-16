import { SiteClient } from 'datocms-client';

export default async function recebeRequest(request, response) {

    if (request.method !== 'POST') {
        response.status(404).json({ message: 'Método não permitido!' });
        return;
    }

    const token = '440f1f74dbd8a9eb9ecb4f083f79f1';
    const client = new SiteClient(token);
    const dados = JSON.parse(request.body);

    const registroCriado = await client.items.create({
        itemType: '972329',
        ...dados,
    });

    response.json({ registroCriado });
}