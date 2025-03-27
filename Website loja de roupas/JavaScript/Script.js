// Array para armazenar os itens no carrinho
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; // Mantém o carrinho persistente no navegador

// Função para abrir o carrinho
function abrirCarrinho() {
    const sidebar = document.getElementById("sidebar-carrinho");
    sidebar.classList.add("ativo");
    

    // Exibe o conteúdo do carrinho
    exibirCarrinho();
}

// Função para fechar o carrinho
function fecharCarrinho() {
    const sidebar = document.getElementById("sidebar-carrinho");
    sidebar.classList.remove("ativo");
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(nomeProduto, precoProduto, tamanhoProduto) {
    // Verifica se um tamanho foi selecionado
    if (!tamanhoProduto) {
        alert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
        return;
    }

    // Criar um objeto com as informações do produto
    const itemCarrinho = {
        nome: nomeProduto,
        preco: precoProduto,
        tamanho: tamanhoProduto
    };

    // Adicionar o item ao carrinho
    carrinho.push(itemCarrinho);

    // Salvar o carrinho no localStorage para persistir os dados
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Exibir o carrinho após adicionar o item
    exibirCarrinho();
}

// Função para obter o tamanho selecionado
function obterTamanhoSelecionado() {
    // Seleciona todos os botões de tamanho
    const botoesTamanho = document.querySelectorAll(".tamanho-btn");

    // Verifica qual tamanho foi selecionado
    for (let i = 0; i < botoesTamanho.length; i++) {
        if (botoesTamanho[i].classList.contains("selecionado")) {
            return botoesTamanho[i].dataset.tamanho;
        }
    }

    // Retorna null se nenhum tamanho for selecionado
    return null;
}

// Função para remover um item específico do carrinho
function removerDoCarrinho(index) {
    // Remover o item do carrinho usando o índice
    carrinho.splice(index, 1);

    // Atualizar o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Exibir o carrinho novamente após remover o item
    exibirCarrinho();
}

// Função para exibir os itens no carrinho
function exibirCarrinho() {
    const conteudoCarrinho = document.getElementById("conteudo-carrinho");

    // Limpa o conteúdo atual do carrinho
    conteudoCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        conteudoCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        // Exibe os itens do carrinho
        carrinho.forEach((item, index) => {
            const divItem = document.createElement("div");
            divItem.classList.add("item-carrinho");
            divItem.innerHTML = `
                <p>${item.nome}</p>
                <p>Tamanho: ${item.tamanho}</p>
                <p>Preço: R$ ${item.preco}</p>
                <button onclick="removerDoCarrinho(${index})" class="remover-btn">
                    <img src="../../images/icon-lata-lixo.png" alt="Remover" width="20" height="20">
                </button>
            `;
            conteudoCarrinho.appendChild(divItem);
        });
    }
}

// Adiciona ou remove a classe 'selecionado' nos botões de tamanho
document.addEventListener('DOMContentLoaded', function () {
    const botoesTamanho = document.querySelectorAll(".tamanho-btn");
    botoesTamanho.forEach((botao) => {
        botao.addEventListener("click", function () {
            // Remove a classe 'selecionado' de todos os botões
            botoesTamanho.forEach((botao) => {
                botao.classList.remove("selecionado");
            });

            // Adiciona a classe 'selecionado' ao botão clicado
            botao.classList.add("selecionado");
        });
    });
});

// Função para limpar o carrinho
function limparCarrinho() {
    // Limpar o array do carrinho
    carrinho = [];

    // Remover o carrinho do localStorage
    localStorage.removeItem('carrinho');

    // Exibir o carrinho atualizado (que agora está vazio)
    exibirCarrinho();
}
// Função para finalizar a compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens antes de finalizar a compra.");
        return;
    }

    // Calcular o total
    let total = carrinho.reduce((sum, item) => sum + parseFloat(item.preco), 0);
    
    // Criar resumo do pedido
    let resumo = "Resumo do Pedido:\n\n";
    carrinho.forEach(item => {
        resumo += `${item.nome} (Tamanho: ${item.tamanho}) - R$ ${item.preco}\n`;
    });
    resumo += `\nTotal: R$ ${total.toFixed(2)}`;
    
    // Mostrar confirmação
    if (confirm(`${resumo}\n\nDeseja finalizar a compra?`)) {
        // Aqui você pode adicionar lógica para enviar o pedido para um servidor
        alert("Compra finalizada com sucesso! Obrigado por sua compra.");
        
        // Limpar o carrinho após finalização
        limparCarrinho();
        
        // Fechar o carrinho
        fecharCarrinho();
    }
}

// Modifique a função exibirCarrinho para incluir o botão de finalizar
function exibirCarrinho() {
    const conteudoCarrinho = document.getElementById("conteudo-carrinho");

    // Limpa o conteúdo atual do carrinho
    conteudoCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        conteudoCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        // Exibe os itens do carrinho
        carrinho.forEach((item, index) => {
            const divItem = document.createElement("div");
            divItem.classList.add("item-carrinho");
            divItem.innerHTML = `
                <p>${item.nome}</p>
                <p>Tamanho: ${item.tamanho}</p>
                <p>Preço: R$ ${item.preco}</p>
                <button onclick="removerDoCarrinho(${index})" class="remover-btn">
                    <img src="../../images/icon-lata-lixo.png" alt="Remover" width="20" height="20">
                </button>
            `;
            conteudoCarrinho.appendChild(divItem);
        });

        // Adiciona o botão de finalizar compra
        const finalizarBtn = document.createElement("button");
        finalizarBtn.textContent = "Finalizar Compra";
        finalizarBtn.classList.add("finalizar-btn");
        finalizarBtn.onclick = finalizarCompra;
        conteudoCarrinho.appendChild(finalizarBtn);
    }
}
