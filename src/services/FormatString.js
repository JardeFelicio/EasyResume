export default function formatString(inputString) {
  // Remover espaços em branco antes e depois da string e quebrar em palavras

  const words = inputString.trim().split(/\s+/);

  // Capitalizar a primeira letra de cada palavra
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Juntar as palavras formatadas em uma string
  const formattedString = formattedWords.join(" ");

  return formattedString;
}
