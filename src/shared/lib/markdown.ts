import { marked } from 'marked';
import hljs from 'highlight.js';

export async function parseMarkdown(content: string): Promise<string> {
  const html = await marked(content, {
    breaks: true,
    gfm: true,
  });
  
  // シンタックスハイライトは後から適用
  return html.replace(/<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g, (match, lang, code) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(code, { language: lang }).value;
        return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
      } catch (err) {
        console.error('Highlight.js error:', err);
      }
    }
    return match;
  });
}