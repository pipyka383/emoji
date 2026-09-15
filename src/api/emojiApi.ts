import axios from 'axios';

export interface IEmojiItem {
  id: number;
  emoji: string;
  title: string;
  keywords: string;
}

const API_URL = 'http://localhost:3000/api/emojis';

export async function getEmojis(query: string = ''): Promise<IEmojiItem[]> {
  const response = await axios.get<IEmojiItem[]>(API_URL, {
    params: query ? { q: query } : {},
  });
  return response.data;
}