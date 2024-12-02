const fs = require('fs');
const path = require('path');

// Carregar configurações do NIF, NISS, NUS, telemóvel, trabalho e vencimento
const configPath = path.join(__dirname, '..', 'data', 'nif.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const ssConfigPath = path.join(__dirname, '..', 'data', 'ss.json');
const ssConfig = JSON.parse(fs.readFileSync(ssConfigPath, 'utf8'));
const utenteConfigPath = path.join(__dirname, '..', 'data', 'utente.json');
const utenteConfig = JSON.parse(fs.readFileSync(utenteConfigPath, 'utf8'));
const telConfigPath = path.join(__dirname, '..', 'data', 'tel.json');
const telConfig = JSON.parse(fs.readFileSync(telConfigPath, 'utf8'));
const trabalhoConfigPath = path.join(__dirname, '..', 'data', 'trabalho.json');
const trabalhoConfig = JSON.parse(fs.readFileSync(trabalhoConfigPath, 'utf8'));
const vencimentoConfigPath = path.join(__dirname, '..', 'data', 'vencimento.json');
const vencimentoConfig = JSON.parse(fs.readFileSync(vencimentoConfigPath, 'utf8'));

// Carregar nomes masculinos, femininos, cidades, sobrenomes, configurações de e-mail e filhos
const nomesMasculinosPath = path.join(__dirname, '..', 'data', 'nomes-masculinos.json');
const nomesFemininosPath = path.join(__dirname, '..', 'data', 'nomes-femininos.json');
const cidadesPath = path.join(__dirname, '..', 'data', 'cidades.json');
const sobrenomesPath = path.join(__dirname, '..', 'data', 'sobrenome.json');
const emailConfigPath = path.join(__dirname, '..', 'data', 'email.json');
const filhosPath = path.join(__dirname, '..', 'data', 'filhos.json');
const ccPath = path.join(__dirname, '..', 'data', 'cc.json');
const moradasPath = path.join(__dirname, '..', 'data', 'moradas.json');

const nomesMasculinos = JSON.parse(fs.readFileSync(nomesMasculinosPath, 'utf8'));
const nomesFemininos = JSON.parse(fs.readFileSync(nomesFemininosPath, 'utf8'));
const cidades = JSON.parse(fs.readFileSync(cidadesPath, 'utf8'));
const sobrenomes = JSON.parse(fs.readFileSync(sobrenomesPath, 'utf8'));
const emailConfig = JSON.parse(fs.readFileSync(emailConfigPath, 'utf8'));
const filhosConfig = JSON.parse(fs.readFileSync(filhosPath, 'utf8'));
const ccConfig = JSON.parse(fs.readFileSync(ccPath, 'utf8'));
const moradasConfig = JSON.parse(fs.readFileSync(moradasPath, 'utf8'));



// TODO - Ajustar situação da cidade consoante as coordenadas




// Função para calcular o gênero de uma pessoa com base em uma percentagem
function calcularGenero(percentagemMasculino) {
    return Math.random() * 100 < percentagemMasculino ? 'masculino' : 'feminino';
}

// Função para carregar situações do arquivo JSON
function carregarSituacoes(arquivo) {
    const dados = fs.readFileSync(arquivo, 'utf-8');
    return JSON.parse(dados).situacoes;
}

// Função para gerar situação aleatória com base na idade
function gerarSituacaoAleatoria(situacoes, idade) {
    const situacoesValidas = situacoes.filter(situacao => idade >= situacao.idadeMin && idade <= situacao.idadeMax);
    return situacoesValidas.length > 0 ? situacoesValidas[Math.floor(Math.random() * situacoesValidas.length)].situacao : null;
}

// Função para gerar um número de cartão conforme especificado
function gerarNumeroCartao() {
    const { array } = ccConfig;

    // Gerar os primeiros 8 dígitos, começando com 1, 2 ou 3
    let numeroCartao = ['1', '2', '3'][Math.floor(Math.random() * 3)];
    for (let i = 1; i < 8; i++) {
        numeroCartao += array[Math.floor(Math.random() * 10)];
    }

    // Adicionar o asterisco e mais um dígito
    numeroCartao += '*' + array[Math.floor(Math.random() * 10)];

    // Adicionar o asterisco, duas letras e um dígito
    numeroCartao += '*' + array[Math.floor(Math.random() * 26) + 10] + array[Math.floor(Math.random() * 26) + 10] + array[Math.floor(Math.random() * 10)];

    return numeroCartao;
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000);
  }

  function gerarMorada() {
    let moradasConfig;

    try {
      // Read and parse the moradas.json file
      const data = fs.readFileSync(moradasPath, 'utf8');
      moradasConfig = JSON.parse(data);

      // Ensure that moradasConfig is an array and not empty
      if (!Array.isArray(moradasConfig) || moradasConfig.length === 0) {
        throw new Error('Invalid moradas.json format or empty array.');
      }
    } catch (err) {
      console.error("Error reading or parsing the moradas.json file:", err);
      process.exit(1); // Exit the process if file reading/parsing fails
    }

    // Select a random address from the parsed moradas array
    const randomIndex = Math.floor(Math.random() * moradasConfig.length);
    const selectedAddress = moradasConfig[randomIndex];

    // Check if the house_number exists, if not, generate a random one
    if (!selectedAddress.house_number) {
      selectedAddress.house_number = generateRandomNumber();
    }

    let coordinates;
    if (Array.isArray(selectedAddress.coordinates) && selectedAddress.coordinates.length > 0) {
      // Select the first pair of coordinates
      coordinates = selectedAddress.coordinates[0];  // First coordinate pair
    } else {
      // If there's no coordinates, set it to null or an empty array (based on your preference)
      coordinates = null;
    }

    // Return an object called 'address' with the formatted address and coordinates
    const address = {
      address: `${selectedAddress.street} ${selectedAddress.house_number}`,
      coordinates: coordinates
    };

    return address;
  }

// Função para gerar um NIF que começa com 1, 2 ou 3 e tem 9 dígitos
// function gerarNIF() {
//     const { nif_length, valid_start_digits } = config;
//     let nif = valid_start_digits[Math.floor(Math.random() * valid_start_digits.length)].toString();
//     for (let i = 1; i < nif_length; i++) {
//         nif += Math.floor(Math.random() * 10);
//     }
//     return nif;
// }

function gerarNIF() {

    const config = {
        nif_length: 9, // O NIF deve ter 9 dígitos
        valid_start_digits: [1, 2] // Dígitos válidos para começar
    };


    let nif = config.valid_start_digits[Math.floor(Math.random() * config.valid_start_digits.length)].toString();
    for (let i = 1; i < config.nif_length - 1; i++) {
        nif += Math.floor(Math.random() * 10);
    }

    const pesos = [9, 8, 7, 6, 5, 4, 3, 2];
    const soma = nif
        .split("")
        .reduce((acc, digito, i) => acc + parseInt(digito) * pesos[i], 0);

    const resto = soma % 11;
    const digitoControlo = resto === 0 || resto === 1 ? 0 : 11 - resto;

    nif += digitoControlo;

    return nif;
}

// Função para gerar um NISS
function gerarNISS() {
    // Gera os primeiros 9 dígitos (começando com 1 para pessoa singular)
    const primeirosDigitos = [1, ...Array.from({ length: 8 }, () => Math.floor(Math.random() * 10))];

    // Calcular o dígito de controlo (módulo 97)
    let soma = primeirosDigitos.reduce((acc, digito, i) => acc + digito * (10 - i), 0);
    const digitoControlo = 97 - (soma % 97);

    // Formatar o NISS completo
    const niss = [...primeirosDigitos, digitoControlo].join("").padStart(11, "0");
    return niss;
}

// Função para gerar um NUS
function gerarNumeroUtente() {
    // Gera os primeiros 8 dígitos (o primeiro não pode ser 0)
    const primeirosDigitos = [Math.floor(Math.random() * 9) + 1, ...Array.from({ length: 7 }, () => Math.floor(Math.random() * 10))];

    // Calcular o dígito de controlo (módulo 11)
    let soma = primeirosDigitos.reduce((acc, digito, i) => acc + digito * (9 - i), 0);
    const resto = soma % 11;
    const digitoControlo = resto <= 1 ? 0 : 11 - resto;

    // Formatar o número de utente completo
    const numeroUtente = [...primeirosDigitos, digitoControlo].join("");
    return numeroUtente;
}

// Função para gerar um ou dois nomes
function gerarNome(genero) {
    const nomes = genero === 'masculino' ? nomesMasculinos : nomesFemininos;
    const primeiroNome = nomes[Math.floor(Math.random() * nomes.length)];
    const segundoNome = Math.random() < 0.5 ? nomes[Math.floor(Math.random() * nomes.length)] : '';
    return segundoNome ? `${primeiroNome} ${segundoNome}` : primeiroNome;
}

// Função para gerar um ou dois sobrenomes
function gerarSobrenome() {
    const primeiroSobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    const segundoSobrenome = Math.random() < 0.5 ? sobrenomes[Math.floor(Math.random() * sobrenomes.length)] : '';
    return segundoSobrenome ? `${primeiroSobrenome} ${segundoSobrenome}` : primeiroSobrenome;
}

// Função para gerar uma idade
function gerarDataNascimento() {
    const dataAtual = new Date();

    // Gerar uma data de nascimento entre 1900 e 2020
    const anoNascimento = Math.floor(Math.random() * (2023 - 1920 + 1)) + 1900;
    const mesNascimento = Math.floor(Math.random() * 12) + 1;
    const diaNascimento = Math.floor(Math.random() * 28) + 1;

    // Calcular a idade com base na data de nascimento
    const dataNascimento = new Date(anoNascimento, mesNascimento, diaNascimento);

    return dataNascimento;
}

function calcularIdade(dataNascimento) {
    const dataAtual = new Date();
    const idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
    return idade;
}
// Função para gerar uma cidade
function gerarCidade() {
    return cidades[Math.floor(Math.random() * cidades.length)].cidade;
}

// Função para gerar um e-mail aleatório sem caracteres especiais
function gerarEmail() {
    const { numeros, letras, dominios } = emailConfig;
    let email = '';

    // Gerar a parte local do e-mail
    const length = Math.floor(Math.random() * 10) + 5; // Comprimento entre 5 e 15 caracteres
    for (let i = 0; i < length; i++) {
        const charType = Math.floor(Math.random() * 2);
        if (charType === 0) {
            email += numeros[Math.floor(Math.random() * numeros.length)];
        } else {
            email += letras[Math.floor(Math.random() * letras.length)];
        }
    }

    // Adicionar o domínio
    email += '@' + dominios[Math.floor(Math.random() * dominios.length)];

    return email;
}

// Função para gerar a quantidade de filhos com base na idade
function gerarFilhos(idade) {
    if (idade >= 16 && idade <= 130) {
        const { numeros } = filhosConfig;
        return numeros[Math.floor(Math.random() * numeros.length)];
    }
    return 0;
}

// Função para gerar um número de telemóvel
function gerarTelemovel() {
    const { prefixos } = telConfig;
    const prefixo = prefixos[Math.floor(Math.random() * prefixos.length)];
    const numero = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
    return `${prefixo}${numero}`;
}

// Função para gerar um código postal com base na cidade
function gerarCodigoPostal(cidade) {
    const cidadeObj = cidades.find(c => c.cidade === cidade);
    return cidadeObj.codigosPostais[Math.floor(Math.random() * cidadeObj.codigosPostais.length)];
}

// Função para gerar um vencimento aleatório com base na idade e garantir que 50% sejam até 2000€
function gerarVencimento(idade) {
    const { vencimentos } = vencimentoConfig;
    const vencimentosAte2000 = vencimentos.filter(vencimento => vencimento.faixa.includes('Menos de 500€') || vencimento.faixa.includes('Entre 500€ e 999€') || vencimento.faixa.includes('Entre 1.000€ e 1.499€') || vencimento.faixa.includes('Entre 1.500€ e 1.999€'));
    const vencimentosAcima2000 = vencimentos.filter(vencimento => !vencimentosAte2000.includes(vencimento));

    if (Math.random() < 0.5) {
        return vencimentosAte2000[Math.floor(Math.random() * vencimentosAte2000.length)].faixa;
    } else {
        return vencimentosAcima2000[Math.floor(Math.random() * vencimentosAcima2000.length)].faixa;
    }
}


// Função principal para gerar os dados
function gerarDados(numPessoas, percentagemMasculino) {
    const data = [];
    const situacoes = trabalhoConfig.situacoesEmprego;

    for (let i = 0; i < numPessoas; i++) {
        const genero = calcularGenero(percentagemMasculino);
        const dataNascimento = gerarDataNascimento();
        const idade = calcularIdade(dataNascimento);
        const cidade = gerarCidade();
        const morada = gerarMorada();
        const codigoPostal = gerarCodigoPostal(cidade);
        const situacaoEmprego = gerarSituacaoAleatoria(situacoes, idade);
        const vencimento = gerarVencimento(idade);
        const pessoa = {
            nome: gerarNome(genero),
            genero: genero,
            sobrenome: gerarSobrenome(),
            dataNascimento: dataNascimento,
            idade: idade,
            morada: morada,
            cidade: cidade,
            codigoPostal: codigoPostal,
            situacaoEmprego: situacaoEmprego,
            vencimento: vencimento,
            nif: gerarNIF(),
            niss: gerarNISS(),
            nus: gerarNumeroUtente(),
            numeroCartao: gerarNumeroCartao(),
            email: gerarEmail(),
            filhos: gerarFilhos(idade),
            telemovel: gerarTelemovel()
        };
        data.push(pessoa);
    }

    return data;
}

module.exports = { calcularGenero, carregarSituacoes, gerarSituacaoAleatoria, generateRandomNumber,gerarNumeroCartao, gerarNIF, gerarNISS, gerarNumeroUtente, gerarNome, gerarSobrenome, gerarDataNascimento, calcularIdade, gerarCidade, gerarEmail, gerarMorada ,gerarDados, gerarFilhos, gerarTelemovel, gerarCodigoPostal, gerarVencimento };