import axios from 'axios';

async function criarPedido() {
  const pedidos = [
    {
      cliente: 'Hermanoteu',
      itens: ['Chocolate', 'Australopitecus'],
    },
    {
      cliente: 'Zeus',
      itens: ['Café', 'Pão de Queijo'],
    },
    {
      cliente: 'Atena',
      itens: ['Laranja', 'Maçã', 'Pera'],
    },
    {
      cliente: 'Hades',
      itens: ['Feijão', 'Arroz', 'Frango'],
    },
    {
      cliente: 'Apolo',
      itens: ['Cerveja', 'Churrasco', 'Batata Frita'],
    },
    {
      cliente: 'Hermes',
      itens: ['Sushi', 'Tempura', 'Arroz Japonês'],
    },
    {
      cliente: 'Afrodite',
      itens: ['Salada', 'Frango Grelhado', 'Arroz Integral'],
    },
    {
      cliente: 'Poseidon',
      itens: ['Peixe', 'Frutos do Mar', 'Batata Assada'],
    },
  ];

  for (const pedido of pedidos) {
    try {
      const response = await axios.post(
        'http://localhost:3000/pedidos',
        pedido
      );
      console.log('Pedido criado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
    }
  }
}

criarPedido();
