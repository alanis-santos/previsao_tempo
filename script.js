// ===== SELEÇÃO DE ELEMENTOS DO DOM =====
const formBusca = document.getElementById('form-busca');
const inputCidade = document.getElementById('input-cidade');
const mensagemErro = document.getElementById('mensagem-erro');
const resultado = document.getElementById('resultado');

const nomeCidadeEl = document.getElementById('nome-cidade');
const dataHoraEl = document.getElementById('data-hora');
const iconeClimaEl = document.getElementById('icone-clima');
const temperaturaEl = document.getElementById('temperatura');
const descricaoClimaEl = document.getElementById('descricao-clima');
const sensacaoTermicaEl = document.getElementById('sensacao-termica');
const umidadeEl = document.getElementById('umidade');
const ventoEl = document.getElementById('vento');

// ===== TABELA DE CÓDIGOS DE CLIMA (Open-Meteo usa códigos WMO) =====
// Documentação: https://open-meteo.com/en/docs
const codigosClima = {
  0: { descricao: 'Céu limpo', icone: '☀️' },
  1: { descricao: 'Predomínio de sol', icone: '🌤️' },
  2: { descricao: 'Parcialmente nublado', icone: '⛅' },
  3: { descricao: 'Nublado', icone: '☁️' },
  45: { descricao: 'Neblina', icone: '🌫️' },
  48: { descricao: 'Neblina com geada', icone: '🌫️' },
  51: { descricao: 'Garoa fraca', icone: '🌦️' },
  53: { descricao: 'Garoa moderada', icone: '🌦️' },
  55: { descricao: 'Garoa intensa', icone: '🌧️' },
  61: { descricao: 'Chuva fraca', icone: '🌧️' },
  63: { descricao: 'Chuva moderada', icone: '🌧️' },
  65: { descricao: 'Chuva forte', icone: '🌧️' },
  71: { descricao: 'Neve fraca', icone: '🌨️' },
  73: { descricao: 'Neve moderada', icone: '🌨️' },
  75: { descricao: 'Neve forte', icone: '❄️' },
  80: { descricao: 'Pancadas de chuva fracas', icone: '🌦️' },
  81: { descricao: 'Pancadas de chuva moderadas', icone: '🌧️' },
  82: { descricao: 'Pancadas de chuva fortes', icone: '⛈️' },
  95: { descricao: 'Tempestade', icone: '⛈️' },
  96: { descricao: 'Tempestade com granizo', icone: '⛈️' },
  99: { descricao: 'Tempestade forte com granizo', icone: '⛈️' },
};

// ===== FUNÇÃO: buscar coordenadas da cidade digitada =====
async function buscarCoordenadas(cidade) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;

  const resposta = await fetch(url);
  const dados = await resposta.json();

  if (!dados.results || dados.results.length === 0) {
    throw new Error('Cidade não encontrada. Verifique o nome digitado.');
  }

  const local = dados.results[0];
  return {
    nome: local.name,
    pais: local.country,
    latitude: local.latitude,
    longitude: local.longitude,
  };
}

// ===== FUNÇÃO: buscar dados do clima a partir das coordenadas =====
async function buscarClima(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error('Não foi possível obter os dados do clima.');
  }

  const dados = await resposta.json();
  return dados.current;
}

// ===== FUNÇÃO: atualizar a tela com os dados recebidos =====
function exibirResultado(local, clima) {
  const codigo = codigosClima[clima.weather_code] || {
    descricao: 'Condição desconhecida',
    icone: '❓',
  };

  nomeCidadeEl.textContent = `${local.nome}, ${local.pais}`;

  const agora = new Date();
  dataHoraEl.textContent = agora.toLocaleString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

  iconeClimaEl.textContent = codigo.icone;
  temperaturaEl.textContent = `${Math.round(clima.temperature_2m)}°C`;
  descricaoClimaEl.textContent = codigo.descricao;

  sensacaoTermicaEl.textContent = `${Math.round(clima.apparent_temperature)}°C`;
  umidadeEl.textContent = `${clima.relative_humidity_2m}%`;
  ventoEl.textContent = `${Math.round(clima.wind_speed_10m)} km/h`;

  resultado.classList.remove('escondido');
}

// ===== FUNÇÃO: exibir mensagem de erro =====
function exibirErro(mensagem) {
  mensagemErro.textContent = mensagem;
  resultado.classList.add('escondido');
}

// ===== FUNÇÃO: limpar mensagem de erro =====
function limparErro() {
  mensagemErro.textContent = '';
}

// ===== FUNÇÃO PRINCIPAL: orquestra a busca completa =====
async function consultarClima(cidade) {
  try {
    limparErro();

    const local = await buscarCoordenadas(cidade);
    const clima = await buscarClima(local.latitude, local.longitude);

    exibirResultado(local, clima);
  } catch (erro) {
    exibirErro(erro.message);
  }
}

// ===== EVENTO: envio do formulário =====
formBusca.addEventListener('submit', function (evento) {
  evento.preventDefault(); // impede o recarregamento da página

  const cidade = inputCidade.value.trim();

  if (cidade === '') {
    exibirErro('Digite o nome de uma cidade.');
    return;
  }

  consultarClima(cidade);
});
