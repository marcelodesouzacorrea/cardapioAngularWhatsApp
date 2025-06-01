import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
  categoria: string;
  descricao?: string;
}

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css'
})
export class CardapioComponent {
  categorias: string[] = ['Todos', 'Lanche', 'Bebida'];
  categoriaSelecionada: string = 'Todos';

  produtos: Produto[] = [
    { id: 1, nome: 'Hambúrguer Artesanal', preco: 24.90, imagem: 'hamburguer1.jpg', quantidade: 0, categoria: 'Lanche', descricao: 'Pão brioche, hambúrguer 180g, queijo cheddar, alface e molho especial' },
    { id: 2, nome: 'Pizza Calabresa', preco: 39.90, imagem: 'pizza.jpg', quantidade: 0, categoria: 'Lanche', descricao: 'Calabresa, queijo, cebola e orégano' },
    { id: 3, nome: 'Kikão', preco: 10.00, imagem: 'kikao.jpg', quantidade: 0, categoria: 'Lanche', descricao: 'Calabresa, queijo, cebola e orégano' },
    { id: 4, nome: 'Suco Natural', preco: 8.50, imagem: 'suco.jpg', quantidade: 0, categoria: 'Bebida', descricao: 'Suco natural de frutas' },
    { id: 5, nome: 'Água Mineral', preco: 4.00, imagem: 'agua.png', quantidade: 0, categoria: 'Bebida', descricao: 'Sem gás' }
  ];

  get produtosFiltrados(): Produto[] {
    if (this.categoriaSelecionada === 'Todos') {
      return this.produtos;
    }
    return this.produtos.filter(p => p.categoria === this.categoriaSelecionada);
  }

  get total(): number {
    return this.produtos.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }

  adicionar(produto: Produto) {
    produto.quantidade++;
  }

  remover(produto: Produto) {
    if (produto.quantidade > 0) {
      produto.quantidade--;
    }
  }

  cliente = {
    nome: '',
    tipoEntrega: '',
    rua: '',
    numero: '',
    bairro: '',
    proximidade: '',
    mesa: '',
    pagamento: '',
    trocoPara: 0
  };

  permitirApenasNumeros(event: KeyboardEvent) {
  const charCode = event.charCode;
  // permite apenas números (48-57)
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}


  enviarPedido() {
    if (!this.cliente.nome || !this.cliente.tipoEntrega) return;

    // ✅ Validação de troco
    if (
      this.cliente.pagamento === 'Dinheiro' &&
      this.cliente.trocoPara &&
      this.cliente.trocoPara < this.total
    ) {
      alert('O valor do troco deve ser maior ou igual ao total do pedido.');
      return;
    }

    // Endereço ou mesa
    let local = '';
    if (this.cliente.tipoEntrega === 'Entrega') {
      local = `Rua ${this.cliente.rua}, Nº ${this.cliente.numero}%0ABairro ${this.cliente.bairro}`;
      if (this.cliente.proximidade) {
        local += `%0A(Ponto de referência: ${this.cliente.proximidade})`;
      }
    } 
    
    else if (this.cliente.tipoEntrega === 'Mesa') {
      local = `Mesa ${this.cliente.mesa}`;
    }

    // Pagamento
    let pagamentoInfo = '';
    if (this.cliente.pagamento === 'Dinheiro') {
      pagamentoInfo = `💵 *Pagamento:* Dinheiro`;
      if (this.cliente.trocoPara && this.cliente.trocoPara >= this.total) {
        const troco = this.cliente.trocoPara - this.total;
        pagamentoInfo += `%0ATroco para: R$ ${this.cliente.trocoPara.toFixed(2)}%0ATroco: R$ ${troco.toFixed(2)}`;
      }
    } else if (this.cliente.pagamento) {
      pagamentoInfo = `💳 *Pagamento:* ${this.cliente.pagamento}`;
    }

    // Itens do pedido
    const itens = this.produtos
      .filter(p => p.quantidade > 0)
      .map(p => `• ${p.nome} x${p.quantidade} - R$ ${(p.preco * p.quantidade).toFixed(2)}`)
      .join('%0A');

    // Mensagem final
    const texto =
      `*📝 Novo Pedido de ${this.cliente.nome}*%0A%0A` +
      `📍 *Endereço:*%0A${local}%0A%0A` +
      `${pagamentoInfo}%0A%0A` +
      `🛒 *Itens do Pedido:*%0A${itens}%0A%0A` +
      `💵 *Total:* R$ ${this.total.toFixed(2)}`;

    const numeroWhatsApp = 454//'5592984951556';
    const url = `https://wa.me/${numeroWhatsApp}?text=${texto}`;
    window.open(url, '_blank');
  }
}
