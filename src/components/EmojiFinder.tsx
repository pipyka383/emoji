import { useEffect, useState } from 'react';
import { getEmojis, type IEmojiItem } from '../api/emojiApi';

export default function EmojiFinder() {
  const [emojis, setEmojis] = useState<IEmojiItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEmojis(searchTerm);
        if (!cancelled) setEmojis(data);
      } catch {
        if (!cancelled) {
          setError(
            'Не удалось загрузить данные. Проверьте, запущен ли сервер (start.bat).'
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [searchTerm]);

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search emoji..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p className="status">Загрузка эмодзи...</p>}
      {error && <p className="status status--error">{error}</p>}

      {!loading && !error && (
        <div className="container">
          {emojis.length === 0 ? (
            <p className="status">Эмодзи не найдены</p>
          ) : (
            emojis.map((emoji, index) => (
              <div className="emoji-card" key={index}>
                <div className="emoji">{emoji.emoji}</div>
                <h2>{emoji.title}</h2>
                <p>{emoji.keywords}</p>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}