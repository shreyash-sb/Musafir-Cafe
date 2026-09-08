import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function appendRecord<T>(fileName: string, record: T) {
  await mkdir(DATA_DIR, { recursive: true });
  const filePath = path.join(DATA_DIR, fileName);
  let records: T[] = [];

  try {
    const file = await readFile(filePath, "utf8");
    records = JSON.parse(file) as T[];
    if (!Array.isArray(records)) records = [];
  } catch {
    records = [];
  }

  records.push(record);
  await writeFile(filePath, `${JSON.stringify(records, null, 2)}\n`);
}
