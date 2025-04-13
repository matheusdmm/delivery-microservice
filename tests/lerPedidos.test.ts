import axios from 'axios';

async function lerPedidos() {
  try {
    const response = await axios.get('http://localhost:3000/pedidos');
    const pedidos = response.data;
    console.log('Pedidos recebidos:', pedidos);
  } catch (error) {
    console.error('Erro ao ler pedidos:', error);
  }
}

lerPedidos();
