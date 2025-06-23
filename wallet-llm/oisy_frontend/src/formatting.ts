// Text formatting utilities

export function convertUrlsToLinks(text: string): string {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
}

export function convertMarkdownToHtml(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

export function convertNewlinesToBr(text: string): string {
  return text.replace(/\\n/g, '<br>').replace(/\n/g, '<br>');
}

export function formatMessage(text: string, isBot: boolean = false): string {
  let formattedText = convertNewlinesToBr(text);
  formattedText = convertUrlsToLinks(formattedText);
  if (isBot) {
    formattedText = convertMarkdownToHtml(formattedText);
  }
  return formattedText;
} 