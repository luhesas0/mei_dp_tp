
# Gerador de Dados Aleatórios

Este projeto gera dados aleatórios de pessoas portuguesas, incluindo:
- Nome (masculino ou feminino)
- Número de Contribuinte (NIF)
- Sobrenome
- Cidade
- Idade
- outros

## Como Usar

1. Executar um dos dois comandos na linha de comando da pasta 
    - node index.js ou npm start
2. O script fará as seguintes perguntas:
    - Qual é o nome da disciplina? (A resposta deve ser "dados e privacidade")
    - Quantas pessoas deseja gerar?
    - Qual é a percentagem do gênero masculino que deseja gerar?

3. Os dados gerados serão salvos na pasta `output` nos formatos JSON, CSV, TXT e HTML.
    
## Instalação caso seja necessário

1. Clone o repositório:
    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DO_REPOSITORIO>
    ```

2. Instale as dependências:
    ```sh
    npm install

## Estrutura do Projeto

- `index.js`: Ponto de entrada principal do projeto.
- `src/gerador.js`: Contém as funções para gerar NIF, nome, idade e cidade. no caso dos nomes tem nomes aleatórios e todos os nomes começados pela letra A autorizados pelo IRN
- `src/formats.js`: Contém as funções para salvar os dados gerados em diferentes formatos.
- `data/nif.json`: Configurações para a geração de NIF.
- `data/nomes-masculinos.json`: Lista de nomes masculinos.
- `data/nomes-femininos.json`: Lista de nomes femininos.
- `data/cidades.json`: Lista de cidades.
- `data/idade.json`: configurações para a geração de idades
- `data/sobrenome.json`: lista de sobrenomes
- `data/outros.json`: listagens diversas

## Autores

- José Soares 8240047
- Luis Soares 8210396 

## Licença

Este projeto está licenciado sob a licença ISC.

