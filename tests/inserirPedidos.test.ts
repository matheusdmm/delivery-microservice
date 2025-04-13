import axios from 'axios';

async function criarPedido() {
  const pedidos = [
    {
      cliente: 'Hermanoteu',
      itens: ['Souvlaki de frango', 'Tzatziki', 'Pão Pita'],
    },
    {
      cliente: 'Zeus',
      itens: ['Moussaka', 'Feta', 'Olivas'],
    },
    {
      cliente: 'Atena',
      itens: ['Salgadinhos de feta', 'Salada Grega', 'Pão Pita'],
    },
    {
      cliente: 'Hades',
      itens: [
        'Cozido de cordeiro',
        'Feta grelhado',
        'Batata assada com alecrim',
      ],
    },
    {
      cliente: 'Apolo',
      itens: ['Gyros', 'Tzatziki', 'Batatas fritas'],
    },
    {
      cliente: 'Hermes',
      itens: ['Souvlaki de porco', 'Salada de pepino', 'Pão Pita'],
    },
    {
      cliente: 'Afrodite',
      itens: ['Horiatiki (salada grega)', 'Frango grelhado', 'Arroz com ervas'],
    },
    {
      cliente: 'Poseidon',
      itens: ['Frutos do mar grelhados', 'Moussaka', 'Tzatziki'],
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
