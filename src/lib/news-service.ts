
import type { NewsArticle } from './types';

/**
 * Servicio para obtener noticias reales internacionales en español.
 * Utiliza el feed RSS de El País Internacional convertido a JSON.
 */
export async function fetchRealNews(): Promise<NewsArticle[]> {
  try {
    // Usamos un convertidor de RSS a JSON público para obtener noticias de El País Internacional
    const RSS_URL = 'https://elpais.com/rss/internacional/portada.xml';
    const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error('Error al obtener las noticias del feed');
    }

    return data.items.map((item: any, index: number): NewsArticle => {
      // Intentamos extraer una imagen del contenido si no viene en el enclosure
      const imageMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
      const imageUrl = item.enclosure?.link || (imageMatch ? imageMatch[1] : `https://picsum.photos/seed/news-${index}/600/400`);
      
      // Limpiamos el resumen de etiquetas HTML
      const summary = item.description.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...';

      return {
        id: `news-${index}-${Date.now()}`,
        category: 'technology', // Categoría por defecto ya que el RSS es general/internacional
        location: 'global',
        title: item.title,
        summary: summary,
        imageUrl: imageUrl,
        link: item.link,
        timestamp: new Date(item.pubDate).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
    });
  } catch (error) {
    console.error('Error fetching real news:', error);
    return [];
  }
}
