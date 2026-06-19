# 🌤️ Consulta de Clima

Aplicação web simples para consultar a previsão do tempo em tempo real de qualquer cidade, desenvolvida como atividade prática do Bootcamp Fullstack Java da Generation Brasil.

## 📌 Sobre o projeto

O objetivo desta atividade foi aplicar conceitos de **JavaScript**, com foco em:

- Manipulação do **DOM**
- Tratamento de **eventos**
- Organização do código em **funções**
- Consumo de uma **API externa** com `fetch` e `async/await`

O usuário digita o nome de uma cidade, e a aplicação retorna a temperatura atual, sensação térmica, umidade, velocidade do vento e a condição do tempo no momento.

## 🚀 Funcionalidades

- Busca de cidade por nome
- Exibição da temperatura atual e sensação térmica
- Exibição de umidade e velocidade do vento
- Ícone e descrição da condição climática
- Tratamento de erros (cidade não encontrada, campo vazio, falha na requisição)

## 🛠️ Tecnologias utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **[Open-Meteo API](https://open-meteo.com/)** — API gratuita de geocodificação e previsão do tempo, sem necessidade de chave de acesso

## 📂 Estrutura do projeto

```
consulta-clima/
├── index.html      → Estrutura da página
├── style.css       → Estilização
└── script.js       → Lógica de busca e manipulação do DOM
```

## ▶️ Como executar localmente

1. Clone este repositório:
   ```bash
   git clone https://github.com/alanis-santos/previsao_tempo.git
   ```
2. Abra a pasta do projeto.
3. Abra o arquivo `index.html` no navegador (ou utilize a extensão **Live Server** do VS Code).
4. Digite o nome de uma cidade e clique em **Buscar**.

## 🌐 API utilizada

- **Geocoding API**: converte o nome da cidade digitada em coordenadas geográficas.
- **Forecast API**: retorna os dados climáticos atuais a partir das coordenadas.

Documentação oficial: [open-meteo.com/en/docs](https://open-meteo.com/en/docs)

## 👩‍💻 Autora

Desenvolvido por **Alanis Santos** durante o Bootcamp Fullstack Java da Generation Brasil.
