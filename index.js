const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { gerarDados } = require('./src/gerador');
const { saveJSON, saveCSV, saveTXT, saveHTML } = require('./src/formats');

// Função para perguntar ao utilizador o nome da disciplina
function perguntarNomeDisciplina() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Qual é o nome da disciplina? ', (nomeDisciplina) => {
        if (nomeDisciplina.toLowerCase() === 'dados e privacidade') {
            perguntarConfiguracoes(rl);
        } else {
            console.log('Resposta incorreta. Tente novamente.');
            rl.close();
            perguntarNomeDisciplina();
        }
    });
}

// Função para perguntar ao utilizador a quantidade de pessoas e a percentagem do gênero masculino
function perguntarConfiguracoes(rl) {
    rl.question('Quantas pessoas deseja gerar? ', (numPessoas) => {
        numPessoas = parseInt(numPessoas, 10);

        if (isNaN(numPessoas) || numPessoas <= 0) {
            console.log('Quantidade inválida. Por favor, insira um número maior que 0.');
            rl.close();
            return;
        }

        perguntarPercentagemMasculino(rl, numPessoas);
    });
}

// Função para perguntar ao utilizador a percentagem do gênero masculino
function perguntarPercentagemMasculino(rl, numPessoas) {
    rl.question('Qual é a percentagem do gênero masculino que deseja gerar? ', (percentagemMasculino) => {
        percentagemMasculino = parseInt(percentagemMasculino, 10);

        if (isNaN(percentagemMasculino) || percentagemMasculino < 0 || percentagemMasculino > 100) {
            console.log('Percentagem inválida. Por favor, insira um número entre 0 e 100.');
            perguntarPercentagemMasculino(rl, numPessoas);
        } else {
            // Gerar os dados (nomes, NIFs, idades, cidades, etc.)
            const dadosGerados = gerarDados(numPessoas, percentagemMasculino);

            // Caminho da pasta output
            const outputDir = path.join(__dirname, 'output');

            // Verificar se a pasta output existe, se não, criar
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            // Salvar os dados gerados em diferentes formatos
            saveJSON(dadosGerados, path.join(outputDir, 'dados.json'));
            saveCSV(dadosGerados, path.join(outputDir, 'dados.csv'));
            saveTXT(dadosGerados, path.join(outputDir, 'dados.txt'));
            saveHTML(dadosGerados, path.join(outputDir, 'dados.html'));

            console.log('Dados gerados e salvos com sucesso!');
            rl.close();
        }
    });
}

// Chamar a função para perguntar ao utilizador o nome da disciplina
perguntarNomeDisciplina();
