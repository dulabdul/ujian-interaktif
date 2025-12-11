import fs from 'fs';
import path from 'path';
import { MK, Question, ModuleData } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'src/data');

// --- Helper Functions ---

// Fisher-Yates Shuffle Algorithm (untuk mengacak soal)
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// --- Main Data Functions ---

export async function getMKList(): Promise<MK[]> {
  const entries = fs.readdirSync(DATA_DIR, { withFileTypes: true });
  const mkDirs = entries.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
  const mks: MK[] = [];

  for (const code of mkDirs) {
    const metaPath = path.join(DATA_DIR, code, 'meta.json');
    if (fs.existsSync(metaPath)) {
      const fileContent = fs.readFileSync(metaPath, 'utf-8');
      mks.push(JSON.parse(fileContent));
    }
  }
  return mks;
}

export async function getMKByCode(code: string): Promise<MK | null> {
  const metaPath = path.join(DATA_DIR, code, 'meta.json');
  if (!fs.existsSync(metaPath)) return null;
  const fileContent = fs.readFileSync(metaPath, 'utf-8');
  return JSON.parse(fileContent);
}

// FUNGSI BARU: Ambil semua soal dari satu MK + Acak + Limit
export async function getRandomQuestions(mkCode: string, count: number): Promise<Question[]> {
  const mkPath = path.join(DATA_DIR, mkCode);
  
  if (!fs.existsSync(mkPath)) return [];

  const files = fs.readdirSync(mkPath);
  let allQuestions: Question[] = [];

  // 1. Baca semua file JSON modul (kecuali meta.json)
  for (const file of files) {
    if (file === 'meta.json' || !file.endsWith('.json')) continue;
    
    const content = fs.readFileSync(path.join(mkPath, file), 'utf-8');
    try {
      const moduleData: ModuleData = JSON.parse(content);
      // Gabungkan soal ke array utama
      allQuestions = [...allQuestions, ...moduleData.questions];
    } catch (err) {
      console.error(`Error parsing ${file}`, err);
    }
  }

  // 2. Acak urutan soal
  const shuffled = shuffleArray(allQuestions);

  // 3. Potong sesuai jumlah yang diminta (misal: ambil 20 pertama)
  return shuffled.slice(0, count);
}