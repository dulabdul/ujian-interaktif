import { ExamHistoryItem } from '@/types';

const STORAGE_KEY = 'exam_history';

export const getHistory = (): ExamHistoryItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error("Error reading history", error);
    return [];
  }
};

export const saveHistory = (result: ExamHistoryItem) => {
  const currentHistory = getHistory();
  
  // Tambahkan data baru di paling atas (unshift)
  const newHistory = [result, ...currentHistory];
  
  // Opsional: Batasi cuma simpan 20 history terakhir biar storage ga penuh
  const limitedHistory = newHistory.slice(0, 20); 

  localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory));
};