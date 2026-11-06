// Inicialização do catálogo de produtos base
const produtosIniciais = [
  {
    nome: "Fone Bluetooth",
    categoria: "Eletrônicos",
    destaque: "oferta",
    precoAntigo: 164.90,
    preco: 109,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_980288-MLA99966340125_112025-F.webp",
    link: "https://meli.la/1wBAeDX"
  },
  {
    nome: "Garrafa Térmica",
    categoria: "Casa e utilidades",
    destaque: "mais-vendido",
    precoAntigo: 99.99,
    preco: 44.99,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_774036-MLB116796134441_082026-F-garrafa-termica-800ml-inox-bico-duplo-canudo-alca-esporte.webp",
    link: "https://meli.la/2zZCETi"
  },
  {
    nome: "Playstation 5",
    categoria: "Eletrônicos",
    destaque: "",
    precoAntigo: 4599.99,
    preco: 4369.90,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_667226-MLA96871260244_112025-F.webp",
    link: "https://meli.la/1FWhLdU"
  },
  {
    nome: "Smartwatch",
    categoria: "Eletrônicos",
    destaque: "oferta",
    precoAntigo: 257.55,
    preco: 77.26,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_909579-MLA97334242395_112025-F.webp",
    link: "https://meli.la/16m2SvD"
  },
  {
    nome: "Camisa masculina",
    categoria: "Moda",
    precoAntigo: 69.90,
    preco: 49.99,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_712030-MLB106037837590_022026-F-kit2-camiseta-max-titanium-dry-fit-treino-camisa-fitness.webp",
    link: "https://meli.la/1rDhyEU"
  },
  {
    nome: "Playstation 5 Slim Disc",
    categoria: "Eletrônicos",
    destaque: "novidade",
    precoAntigo: 6789.98,
    preco: 5251.34,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_866182-MLA117154059437_092026-F.webp",
    link: "https://meli.la/1GSNx4e"
  },
  {
    nome: "Console De Jogos Hyperkin Retron 2 Hd",
    categoria: "Eletrônicos",
    destaque: "",
    precoAntigo: 710.25,
    preco: 660.80,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_912413-CBT118228041044_102026-F.webp",
    link: "https://meli.la/2KUvR8e"
  },
  {
    nome: "Calça Jeans Wide Leg Feminina Cintura Alta Sem Lycra Stillge",
    categoria: "Moda",
    destaque: "",
    precoAntigo: 109.99,
    preco: 55.59,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_717613-MLB96633630079_102025-F-calca-jeans-wide-leg-feminina-cintura-alta-sem-lycra-stillge.webp",
    link: "https://meli.la/1hj726n"
  },
  {
    nome: "Calça Jeans Masculina Tradicional Corte Reto",
    categoria: "Moda",
    destaque: "mais-vendido",
    precoAntigo: 99.92,
    preco: 62.99,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_996599-MLB88495135003_072025-F-calca-jeans-masculina-tradicional-corte-reto.webp",
    link: "https://meli.la/2NqBiZE"
  },
  {
    nome: "Vestido Longo Casual Festa Alça Grossa Fenda Moda Elegante",
    categoria: "Moda",
    destaque: "mais-vendido",
    precoAntigo: 78.99,
    preco: 36.99,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_728592-MLB93300933428_092025-F-vestido-longo-casual-festa-alca-grossa-fenda-moda-elegante.webp",
    link: "https://meli.la/1Cf2g9b"
  }
];

// Recupera ou inicializa o catálogo do localStorage
let produtos = [];

function carregarProdutos() {
  const catalogoSalvo = localStorage.getItem("radarCatalogo");

  if (catalogoSalvo) {
    try {
      produtos = JSON.parse(catalogoSalvo);
    } catch (e) {
      produtos = [];
    }
  }

  // Se o repositório estiver vazio, carrega os iniciais com IDs válidos
  if (!produtos || produtos.length === 0) {
    produtos = produtosIniciais.map((produto, indice) => ({
      ...produto,
      id: "base-" + indice
    }));
    salvarCatalogo();
  }
}

// Salva o catálogo completo no localStorage
function salvarCatalogo() {
  localStorage.setItem("radarCatalogo", JSON.stringify(produtos));
}

// Carrega os produtos ao iniciar o script
carregarProdutos();

const vitrine = document.getElementById("produtos");
const busca = document.getElementById("busca");
const mensagem = document.getElementById("sem-resultados");

// Formata o preço em reais
function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Função para calcular descontos
function calcularDesconto(precoAntigo, precoAtual) {
  return Math.round(
    ((precoAntigo - precoAtual) / precoAntigo) * 100
  );
}

// Cria um cartão de produto para a vitrine
function criarCartao(produto) {
  const card = document.createElement("article");
  card.className = "card";

  const etiqueta = document.createElement("span");
  etiqueta.className = "etiqueta";

  if (produto.destaque === "oferta") {
    etiqueta.textContent = "🔥 OFERTA DO DIA";
  } else if (produto.destaque === "mais-vendido") {
    etiqueta.textContent = "⭐ MAIS VENDIDO";
  } else if (produto.destaque === "menor-preco") {
    etiqueta.textContent = "💰 MENOR PREÇO";
  } else if (produto.destaque === "novidade") {
    etiqueta.textContent = "NOVIDADE";
  } else {
    etiqueta.hidden = true;
  }

  const imagem = document.createElement("img");
  imagem.src = produto.imagem;
  imagem.alt = produto.nome;
  imagem.className = "imagem-produto";
  imagem.loading = "lazy";

  const categoria = document.createElement("span");
  categoria.className = "categoria";
  categoria.textContent = produto.categoria;

  const titulo = document.createElement("h3");
  titulo.textContent = produto.nome;

  const precoAntigo = document.createElement("p");
  precoAntigo.className = "preco-antigo";

  const preco = document.createElement("p");
  preco.className = "preco";
  preco.textContent = "Por: " + formatarPreco(produto.preco);

  const desconto = document.createElement("span");
  desconto.className = "desconto";

  if (produto.precoAntigo && Number(produto.precoAntigo) > Number(produto.preco)) {
    precoAntigo.textContent = "De: " + formatarPreco(produto.precoAntigo);
    desconto.textContent = calcularDesconto(produto.precoAntigo, produto.preco) + "% OFF";
  } else {
    precoAntigo.hidden = true;
    desconto.hidden = true;
  }

  const botao = document.createElement("a");
  botao.className = "botao";
  botao.textContent = "Conferir na loja ↗️";
  botao.href = produto.link;
  botao.target = "_blank";
  botao.rel = "sponsored noopener noreferrer";

  card.append(
    imagem,
    etiqueta,
    categoria,
    titulo,
    precoAntigo,
    preco,
    desconto,
    botao
  );

  return card;
}

// Mostrar produtos na vitrine
function mostrarProdutos(lista) {
  if (!vitrine) return;

  vitrine.replaceChildren();

  lista.forEach(function(produto) {
    vitrine.appendChild(criarCartao(produto));
  });

  if (mensagem) {
    mensagem.hidden = lista.length !== 0;
  }
}

const filtros = document.querySelectorAll(".filtro");
let categoriaSelecionada = "todos";

// Normaliza os textos para facilitar a comparação (remove acentos)
function normalizar(texto) {
  return (texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// Filtra por categoria e busca na vitrine
function filtrarProdutos() {
  const termo = busca ? normalizar(busca.value) : "";

  const resultado = produtos.filter(function(produto) {
    const correspondeCategoria =
      categoriaSelecionada === "todos" ||
      normalizar(produto.categoria) === normalizar(categoriaSelecionada);

    const correspondeBusca =
      normalizar(produto.nome + " " + produto.categoria).includes(termo);

    return correspondeCategoria && correspondeBusca;
  });

  mostrarProdutos(resultado);
}

// Evento dos botões de categoria na vitrine
filtros.forEach(function(botao) {
  botao.addEventListener("click", function() {
    categoriaSelecionada = botao.dataset.categoria;

    filtros.forEach(function(filtro) {
      filtro.classList.remove("ativo");
    });

    botao.classList.add("ativo");
    filtrarProdutos();
  });
});

// Evento da busca na vitrine
if (busca) {
  busca.addEventListener("input", filtrarProdutos);
}

// Inicializa a vitrine
if (vitrine) {
  mostrarProdutos(produtos);
}

// Cadastro de produtos (Painel Admin)
const formulario = document.getElementById("form-produto");
const mensagemCadastro = document.getElementById("mensagem-cadastro");

if (formulario) {
  formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const precoAtualVal = document.getElementById("preco-produto").value;
    const precoAntigoVal = document.getElementById("preco-antigo-produto").value;

    const precoAtual = Number(precoAtualVal);
    const precoAntigo = precoAntigoVal ? Number(precoAntigoVal) : 0;

    if (!Number.isFinite(precoAtual) || precoAtual <= 0) {
      if (mensagemCadastro) mensagemCadastro.textContent = "Informe um preço válido.";
      return;
    }

    const novoProduto = {
      id: "produto-" + Date.now(),
      nome: document.getElementById("nome-produto").value.trim(),
      categoria: document.getElementById("categoria-produto").value,
      preco: precoAtual,
      imagem: document.getElementById("imagem-produto").value.trim(),
      link: document.getElementById("link-produto").value.trim()
    };

    if (!novoProduto.nome || !novoProduto.categoria) {
      if (mensagemCadastro) mensagemCadastro.textContent = "Preencha os campos obrigatórios.";
      return;
    }

    if (precoAntigo > precoAtual) {
      novoProduto.precoAntigo = precoAntigo;
    }

    produtos.push(novoProduto);
    salvarCatalogo();

    formulario.reset();

    if (mensagemCadastro) {
      mensagemCadastro.textContent = "Produto cadastrado com sucesso! 🎉";
    }

    renderizarAdmin();
  });
}

// Lista os produtos no painel administrativo
function renderizarAdmin() {
  const lista = document.getElementById("lista-produtos-admin");
  if (!lista) return;

  // Atualiza os indicadores do painel
  const totalProdutos = document.getElementById("total-produtos");
  const totalCategorias = document.getElementById("total-categorias");
  const totalOfertas = document.getElementById("total-ofertas");

  if (totalProdutos) {
    totalProdutos.textContent = produtos.length;
  }

  if (totalCategorias) {
    const categorias = new Set(
      produtos.map(function(produto) {
        return normalizar(produto.categoria);
      })
    );
    totalCategorias.textContent = categorias.size;
  }

  if (totalOfertas) {
    const ofertas = produtos.filter(function(produto) {
      return produto.destaque && produto.destaque !== "";
    });
    totalOfertas.textContent = ofertas.length;
  }

  lista.replaceChildren();

  // Captura os filtros do admin
  const campoBusca = document.getElementById("busca-admin");
  const termo = campoBusca ? normalizar(campoBusca.value) : "";

  const filtroCategoria = document.getElementById("filtro-admin");
  const categoriaAdmin = filtroCategoria ? filtroCategoria.value : "todos";

  // Filtra lista para o admin
  const produtosFiltrados = produtos.filter(function(produto) {
    const textoProduto = normalizar(
      produto.nome + " " + produto.categoria
    );

    const correspondeBusca = textoProduto.includes(termo);
    const correspondeCategoria =
      categoriaAdmin === "todos" ||
      normalizar(produto.categoria) === normalizar(categoriaAdmin);

    return correspondeBusca && correspondeCategoria;
  });

  if (produtosFiltrados.length === 0) {
    const aviso = document.createElement("p");
    aviso.textContent = "Nenhum produto encontrado.";
    aviso.className = "sem-produtos-admin";
    lista.appendChild(aviso);
    return;
  }

  produtosFiltrados.forEach(function(produto) {
    const item = document.createElement("div");
    item.className = "produto-admin";

    // Foto
    const imagem = document.createElement("img");
    imagem.src = produto.imagem;
    imagem.alt = produto.nome;
    imagem.className = "foto-admin";

    imagem.onerror = function() {
      imagem.style.display = "none";
    };

    // Nome
    const nome = document.createElement("h3");
    nome.textContent = produto.nome;

    // Preço
    const preco = document.createElement("p");
    preco.textContent = formatarPreco(produto.preco);

    // Botão Editar
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "✏️ Editar";
    botaoEditar.type = "button";
    botaoEditar.addEventListener("click", function() {
      editarProduto(produto.id);
    });

    // Botão Excluir
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "🗑️ Excluir";
    botaoExcluir.type = "button";
    botaoExcluir.addEventListener("click", function() {
      excluirProduto(produto.id);
    });

    item.append(
      imagem,
      nome,
      preco,
      botaoEditar,
      botaoExcluir
    );

    lista.appendChild(item);
  });
}

// Configuração dos eventos do painel administrativo
const buscaAdmin = document.getElementById("busca-admin");
if (buscaAdmin) {
  buscaAdmin.addEventListener("input", renderizarAdmin);
}

const filtroAdmin = document.getElementById("filtro-admin");
if (filtroAdmin) {
  filtroAdmin.addEventListener("change", renderizarAdmin);
}

// Editar produto
function editarProduto(id) {
  const produto = produtos.find(function(item) {
    return item.id === id;
  });

  if (!produto) return;

  const novoNome = prompt("Nome do produto:", produto.nome);
  if (novoNome === null) return;

  const novaCategoria = prompt("Categoria:", produto.categoria);
  if (novaCategoria === null) return;

  const novoPreco = prompt("Preço atual:", produto.preco);
  if (novoPreco === null) return;

  const novoPrecoAntigo = prompt("Preço antigo (digite 0 se não houver):", produto.precoAntigo || 0);
  if (novoPrecoAntigo === null) return;

  const novaImagem = prompt("Link da imagem:", produto.imagem);
  if (novaImagem === null) return;

  const novoLink = prompt("Link da loja:", produto.link);
  if (novoLink === null) return;

  const preco = Number(String(novoPreco).replace(",", "."));
  const precoAntigo = Number(String(novoPrecoAntigo).replace(",", "."));

  if (!novoNome.trim() || !novaCategoria.trim() ||
      !Number.isFinite(preco) || preco <= 0 ||
      !Number.isFinite(precoAntigo) || precoAntigo < 0) {
    alert("Confira os dados informados.");
    return;
  }

  produto.nome = novoNome.trim();
  produto.categoria = novaCategoria.trim();
  produto.preco = preco;
  produto.imagem = novaImagem.trim();
  produto.link = novoLink.trim();

  if (precoAntigo > preco) {
    produto.precoAntigo = precoAntigo;
  } else {
    delete produto.precoAntigo;
  }

  salvarCatalogo();
  renderizarAdmin();

  if (vitrine) {
    mostrarProdutos(produtos);
  }

  alert("Produto atualizado com sucesso!");
}

// Excluir produto
function excluirProduto(id) {
  const confirmar = confirm("Tem certeza de que deseja excluir este produto?");
  if (!confirmar) return;

  produtos = produtos.filter(function(produto) {
    return produto.id !== id;
  });

  salvarCatalogo();
  renderizarAdmin();

  if (vitrine) {
    mostrarProdutos(produtos);
  }
}

// Inicializa o painel administrativo
renderizarAdmin();