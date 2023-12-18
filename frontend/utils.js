export function formatDate(dateUTC) {
  const date = new Date(dateUTC).toLocaleString('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short'
  });

  return date;
}