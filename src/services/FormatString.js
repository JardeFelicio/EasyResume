export default {
  formatString: (inputString) => {
    // Remover espaços em branco antes e depois da string e quebrar em palavras
    const words = inputString.trim().split(/\s+/);

    // Capitalizar a primeira letra de cada palavra
    const formattedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    // Juntar as palavras formatadas em uma string
    const formattedString = formattedWords.join(" ");

    return formattedString;
  },
  formatDate: (date) => {
    const newDate = new Date(date);

    // Formata a data de nascimento
    const formattedDate = `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
    console.log(formattedDate);
    return formattedDate;
  },
  formatAge: (date) => {
    const birthDate = new Date(date);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Verificar se o dia e o mês de nascimento já ocorreram no ano atual
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    console.log(age);
    return age;
  },
};
