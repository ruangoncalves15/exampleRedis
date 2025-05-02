import { ExampleData } from '../models/example.model';

export async function createExample(data: ExampleData): Promise<ExampleData> {
    console.log('Criando exemplo com:', data);

    return {
        ...data,
    };
}
