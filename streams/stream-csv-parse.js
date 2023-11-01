import fs from "fs";
import { parse } from "csv-parse";

const cvsFilePath = new URL("../tasks.csv", import.meta.url);

export const processFile = async () => {
  const records = [];
  const parser = fs.createReadStream(cvsFilePath).pipe(parse({}));
  for await (const record of parser) {
    records.push(record);
  }
  return records;
};
