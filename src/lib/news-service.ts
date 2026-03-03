
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

    const response = await fetch(API_URL, { 
      cache: 'no-store',
      next: { revalidate: 0 } 
    });
    
    if (!response.ok) {
        throw new Error('La respuesta de la red no fue satisfactoria');
    }
    
    const data = await response.json();

    if (data.status !== 'ok' || !data.items) {
      throw new Error('Error al obtener las noticias del feed');
    }

    return data.items
      .filter((item: any) => {
        // Filtramos contenidos multimedia que no son imágenes (vídeos .mp4, etc)
        const enclosureUrl = item.enclosure?.link || '';
        const isVideo = enclosureUrl.toLowerCase().endsWith('.mp4') || 
                        enclosureUrl.toLowerCase().endsWith('.m4v') ||
                        enclosureUrl.toLowerCase().includes('video');
        return !isVideo;
      })
      .map((item: any, index: number): NewsArticle => {
        // Intentamos extraer una imagen del contenido si no viene en el enclosure
        const imageMatch = item.description?.match(/<img[^>]+src="([^">]+)"/);
        
        const enclosureUrl = item.enclosure?.link;
        
        // Priorizar imágenes reales de El País, fallback a Picsum con un ID estable (guid)
        const stableId = item.guid || `news-${index}`;
        const imageUrl = enclosureUrl 
          ? enclosureUrl 
          : (imageMatch ? imageMatch[1] : `https://picsum.photos/seed/${stableId}/600/400`);
        
        // Limpiamos el resumen de etiquetas HTML
        const summary = (item.description || '')
          .replace(/<[^>]*>?/gm, '')
          .trim()
          .substring(0, 160) + '...';

        return {
          id: stableId,
          category: 'technology', // Categoría genérica
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
    console.error('Error al obtener noticias reales:', error);
    return [];
  }
}
