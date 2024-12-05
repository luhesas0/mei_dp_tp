const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "..", "data", "nif.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const ssConfigPath = path.join(__dirname, "..", "data", "ss.json");
const ssConfig = JSON.parse(fs.readFileSync(ssConfigPath, "utf8"));
const utenteConfigPath = path.join(__dirname, "..", "data", "utente.json");
const utenteConfig = JSON.parse(fs.readFileSync(utenteConfigPath, "utf8"));
const telConfigPath = path.join(__dirname, "..", "data", "tel.json");
const telConfig = JSON.parse(fs.readFileSync(telConfigPath, "utf8"));
const trabalhoConfigPath = path.join(__dirname, "..", "data", "trabalho.json");
const trabalhoConfig = JSON.parse(fs.readFileSync(trabalhoConfigPath, "utf8"));
const vencimentoConfigPath = path.join(
  __dirname,
  "..",
  "data",
  "vencimento.json"
);
const vencimentoConfig = JSON.parse(
  fs.readFileSync(vencimentoConfigPath, "utf8")
);

const nomesMasculinosPath = path.join(
  __dirname,
  "..",
  "data",
  "nomes-masculinos.json"
);
const nomesFemininosPath = path.join(
  __dirname,
  "..",
  "data",
  "nomes-femininos.json"
);
const cidadesPath = path.join(__dirname, "..", "data", "cidades.json");
const sobrenomesPath = path.join(__dirname, "..", "data", "sobrenome.json");
const emailConfigPath = path.join(__dirname, "..", "data", "email.json");
const filhosPath = path.join(__dirname, "..", "data", "filhos.json");
const ccPath = path.join(__dirname, "..", "data", "cc.json");
const moradasPath = path.join(__dirname, "..", "data", "moradas.json");

const nomesMasculinos = JSON.parse(
  fs.readFileSync(nomesMasculinosPath, "utf8")
);
const nomesFemininos = JSON.parse(fs.readFileSync(nomesFemininosPath, "utf8"));
const cidades = JSON.parse(fs.readFileSync(cidadesPath, "utf8"));
const sobrenomes = JSON.parse(fs.readFileSync(sobrenomesPath, "utf8"));
const emailConfig = JSON.parse(fs.readFileSync(emailConfigPath, "utf8"));
const filhosConfig = JSON.parse(fs.readFileSync(filhosPath, "utf8"));
const ccConfig = JSON.parse(fs.readFileSync(ccPath, "utf8"));
const moradasConfig = JSON.parse(fs.readFileSync(moradasPath, "utf8"));

// TODO - Ajustar situação da cidade consoante postal code do json 

/**
 * Calcula o gênero com base na porcentagem fornecida.
 *
 * @param {number} percentagemMasculino - A porcentagem de chance de ser masculino.
 * @returns {string} - Retorna 'masculino' ou 'feminino' com base na porcentagem.
 */
function calcularGenero(percentagemMasculino) {
  return Math.random() * 100 < percentagemMasculino ? "masculino" : "feminino";
}

/**
 * Carrega as situações a partir de um arquivo JSON.
 *
 * @param {string} arquivo - O caminho para o arquivo JSON.
 * @returns {Array} Uma lista de situações extraídas do arquivo JSON.
 * @throws {Error} Se ocorrer um erro ao ler ou analisar o arquivo.
 */
function carregarSituacoes(arquivo) {
  const dados = fs.readFileSync(arquivo, "utf-8");
  return JSON.parse(dados).situacoes;
}

/**
 * Gera uma situação aleatória válida com base na idade fornecida.
 *
 * @param {Array} situacoes - Lista de objetos de situações, onde cada objeto deve conter as propriedades `idadeMin`, `idadeMax` e `situacao`.
 * @param {number} idade - Idade para filtrar as situações válidas.
 * @returns {string|null} - Uma situação aleatória válida ou `null` se nenhuma situação for válida para a idade fornecida.
 */
function gerarSituacaoAleatoria(situacoes, idade) {
  const situacoesValidas = situacoes.filter(
    (situacao) => idade >= situacao.idadeMin && idade <= situacao.idadeMax
  );
  return situacoesValidas.length > 0
    ? situacoesValidas[Math.floor(Math.random() * situacoesValidas.length)]
        .situacao
    : null;
}

/**
 * Generates a random card number based on predefined configurations.
 *
 * The card number is generated using a combination of random digits and characters
 * from the `ccConfig` array. The format of the generated card number is as follows:
 * - A random digit from the set ["1", "2", "3"]
 * - Followed by 7 random digits from the `ccConfig` array
 * - Followed by a "*" and a random digit from the `ccConfig` array
 * - Followed by a "*" and three random characters from the `ccConfig` array
 *
 * @returns {string} The generated card number.
 */
function gerarNumeroCartao() {
  const { array } = ccConfig;

  let numeroCartao = ["1", "2", "3"][Math.floor(Math.random() * 3)];
  for (let i = 1; i < 8; i++) {
    numeroCartao += array[Math.floor(Math.random() * 10)];
  }

  numeroCartao += "*" + array[Math.floor(Math.random() * 10)];

  numeroCartao +=
    "*" +
    array[Math.floor(Math.random() * 26) + 10] +
    array[Math.floor(Math.random() * 26) + 10] +
    array[Math.floor(Math.random() * 10)];

  return numeroCartao;
}

/**
 * Generates a random integer between 0 and 999.
 *
 * @returns {number} A random integer between 0 and 999.
 */
function generateRandomNumber() {
  return Math.floor(Math.random() * 1000);
}

/**
 * Generates a random address from a configuration file.
 *
 * @returns {Object} An object containing the generated address and its coordinates.
 * @returns {string} address.address - The generated address in the format "street house_number".
 * @returns {Object|null} address.coordinates - The coordinates of the address, or null if not available.
 *
 * @throws Will throw an error if the moradas.json file is not found, cannot be read, or is in an invalid format.
 */
function gerarMorada() {
  let moradasConfig;

  try {
   
    const data = fs.readFileSync(moradasPath, "utf8");
    moradasConfig = JSON.parse(data);

    if (!Array.isArray(moradasConfig) || moradasConfig.length === 0) {
      throw new Error("Invalid moradas.json format or empty array.");
    }
  } catch (err) {
    console.error("Error reading or parsing the moradas.json file:", err);
    process.exit(1); 
  }
  
  const randomIndex = Math.floor(Math.random() * moradasConfig.length);
  const selectedAddress = moradasConfig[randomIndex];

  if (!selectedAddress.house_number) {
    selectedAddress.house_number = generateRandomNumber();
  }

  let coordinates;
  if (
    Array.isArray(selectedAddress.coordinates) &&
    selectedAddress.coordinates.length > 0
  ) {
    coordinates = selectedAddress.coordinates[0];
  } else {
    coordinates = null;
  }

  const address = {
    address: `${selectedAddress.street} ${selectedAddress.house_number}`,
    coordinates: coordinates,
  };

  return address;
}


/**
 * Gera um Número de Identificação Fiscal (NIF) válido.
 *
 * O NIF gerado terá 9 dígitos, começando com um dígito válido (1,2 ou 3),
 * seguido por 7 dígitos aleatórios e um dígito de controlo calculado.
 *
 * @returns {string} Um NIF válido.
 */
function gerarNIF() {
  const config = {
    nif_length: 9, // O NIF deve ter 9 dígitos
    valid_start_digits: [1, 2, 3], // Dígitos válidos para começar
  };

  let nif =
    config.valid_start_digits[
      Math.floor(Math.random() * config.valid_start_digits.length)
    ].toString();
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


/**
 * Generates a Portuguese Social Security Identification Number (NISS).
 *
 * The NISS is composed of 11 digits, where the first digit is always 1,
 * followed by 8 random digits, and a 2-digit control number calculated
 * using the first 9 digits.
 *
 * @returns {string} A valid NISS number as a string.
 */
function gerarNISS() {
  const primeirosDigitos = [
    1,
    ...Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)),
  ];

  let soma = primeirosDigitos.reduce(
    (acc, digito, i) => acc + digito * (10 - i),
    0
  );
  const digitoControlo = 97 - (soma % 97);

  const niss = [...primeirosDigitos, digitoControlo].join("").padStart(11, "0");
  return niss;
}


/**
 * Gera um número de utente válido.
 *
 * O número de utente é composto por 8 dígitos aleatórios seguidos de um dígito de controlo.
 * O dígito de controlo é calculado com base nos primeiros 8 dígitos utilizando um algoritmo.
 *
 * @returns {string} O número de utente gerado.
 */
function gerarNumeroUtente() {
  const primeirosDigitos = [
    Math.floor(Math.random() * 9) + 1,
    ...Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)),
  ];

  let soma = primeirosDigitos.reduce(
    (acc, digito, i) => acc + digito * (9 - i),
    0
  );
  const resto = soma % 11;
  const digitoControlo = resto <= 1 ? 0 : 11 - resto;

  const numeroUtente = [...primeirosDigitos, digitoControlo].join("");
  return numeroUtente;
}


/**
 * Gera um nome aleatório baseado no gênero fornecido.
 *
 * @param {string} genero - O gênero para o qual gerar o nome. Pode ser "masculino" ou "feminino".
 * @returns {string} Um nome gerado aleatoriamente. Pode ser um nome simples ou um nome composto.
 */
function gerarNome(genero) {
  const nomes = genero === "masculino" ? nomesMasculinos : nomesFemininos;
  const primeiroNome = nomes[Math.floor(Math.random() * nomes.length)];
  const segundoNome =
    Math.random() < 0.5 ? nomes[Math.floor(Math.random() * nomes.length)] : "";
  return segundoNome ? `${primeiroNome} ${segundoNome}` : primeiroNome;
}


/**
 * Generates a random surname, optionally combining two surnames.
 *
 * @returns {string} A randomly generated surname, which may consist of one or two parts.
 */
function gerarSobrenome() {
  const primeiroSobrenome =
    sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  const segundoSobrenome =
    Math.random() < 0.5
      ? sobrenomes[Math.floor(Math.random() * sobrenomes.length)]
      : "";
  return segundoSobrenome
    ? `${primeiroSobrenome} ${segundoSobrenome}`
    : primeiroSobrenome;
}


/**
 * Generates a random birth date.
 *
 * The birth date is generated with a random year between 1920 and 2023,
 * a random month between 1 and 12, and a random day between 1 and 28.
 *
 * @returns {Date} A Date object representing the generated birth date.
 */
function gerarDataNascimento() {
  const dataAtual = new Date();

  const anoNascimento = Math.floor(Math.random() * (2023 - 1920 + 1)) + 1900;
  const mesNascimento = Math.floor(Math.random() * 12) + 1;
  const diaNascimento = Math.floor(Math.random() * 28) + 1;

  const dataNascimento = new Date(anoNascimento, mesNascimento, diaNascimento);

  return dataNascimento;
}

/**
 * Calcula a idade com base na data de nascimento fornecida.
 *
 * @param {Date} dataNascimento - A data de nascimento.
 * @returns {number} A idade calculada.
 */
function calcularIdade(dataNascimento) {
  const dataAtual = new Date();
  const idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
  return idade;
}

/**
 * Generates a random city name from the 'cidades' array.
 *
 * @returns {string} A randomly selected city name.
 */
function gerarCidade() {
  return cidades[Math.floor(Math.random() * cidades.length)].cidade;
}


/**
 * Generates a random email address based on the provided configuration.
 *
 * The email address is composed of a random sequence of numbers and letters,
 * followed by a randomly selected domain.
 *
 * @returns {string} A randomly generated email address.
 */
function gerarEmail() {
  const { numeros, letras, dominios } = emailConfig;
  let email = "";

  const length = Math.floor(Math.random() * 10) + 5;
  for (let i = 0; i < length; i++) {
    const charType = Math.floor(Math.random() * 2);
    if (charType === 0) {
      email += numeros[Math.floor(Math.random() * numeros.length)];
    } else {
      email += letras[Math.floor(Math.random() * letras.length)];
    }
  }

  email += "@" + dominios[Math.floor(Math.random() * dominios.length)];
  return email;
}


/**
 * Generates a number of children based on the given age.
 *
 * @param {number} idade - The age of the individual.
 * @returns {number} The number of children if the age is between 16 and 130, otherwise 0.
 */
function gerarFilhos(idade) {
  if (idade >= 16 && idade <= 130) {
    const { numeros } = filhosConfig;
    return numeros[Math.floor(Math.random() * numeros.length)];
  }
  return 0;
}


/**
 * Generates a random mobile phone number based on predefined prefixes.
 *
 * @returns {string} A randomly generated mobile phone number.
 */
function gerarTelemovel() {
  const { prefixos } = telConfig;
  const prefixo = prefixos[Math.floor(Math.random() * prefixos.length)];
  const numero = Array.from({ length: 7 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return `${prefixo}${numero}`;
}


// function gerarCodigoPostal(cidade) {
//   const cidadeObj = cidades.find((c) => c.cidade === cidade);
//   return cidadeObj.codigosPostais[
//     Math.floor(Math.random() * cidadeObj.codigosPostais.length)
//   ];
// }


/**
 * Generates a salary range based on the provided age.
 *
 * @param {number} idade - The age of the individual.
 * @returns {string} - A randomly selected salary range.
 */
function gerarVencimento(idade) {
  const { vencimentos } = vencimentoConfig;
  const vencimentosAte2000 = vencimentos.filter(
    (vencimento) =>
      vencimento.faixa.includes("Menos de 500€") ||
      vencimento.faixa.includes("Entre 500€ e 999€") ||
      vencimento.faixa.includes("Entre 1.000€ e 1.499€") ||
      vencimento.faixa.includes("Entre 1.500€ e 1.999€")
  );
  const vencimentosAcima2000 = vencimentos.filter(
    (vencimento) => !vencimentosAte2000.includes(vencimento)
  );

  if (Math.random() < 0.5) {
    return vencimentosAte2000[
      Math.floor(Math.random() * vencimentosAte2000.length)
    ].faixa;
  } else {
    return vencimentosAcima2000[
      Math.floor(Math.random() * vencimentosAcima2000.length)
    ].faixa;
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
      telemovel: gerarTelemovel(),
    };
    data.push(pessoa);
  }

  return data;
}

module.exports = {
  calcularGenero,
  carregarSituacoes,
  gerarSituacaoAleatoria,
  generateRandomNumber,
  gerarNumeroCartao,
  gerarNIF,
  gerarNISS,
  gerarNumeroUtente,
  gerarNome,
  gerarSobrenome,
  gerarDataNascimento,
  calcularIdade,
  gerarCidade,
  gerarEmail,
  gerarMorada,
  gerarDados,
  gerarFilhos,
  gerarTelemovel,
  gerarCodigoPostal,
  gerarVencimento,
};
