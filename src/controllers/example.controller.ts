import { Request, Response } from 'express';
import { createExample } from '../services/example.service';
import { ExampleData } from '../models/example.model';

export async function handleExamplePost(req: Request, res: Response): Promise<void> {
    try {
        const data = req.body as ExampleData;

        const result = await createExample(data);

        res.status(201).json({ message: 'Exemplo criado com sucesso!', result });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar exemplo', detail: error });
    }
}
