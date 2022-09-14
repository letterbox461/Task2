// @ts-ignore
import * as wordListEng from "wordlist-english";
import axios from "axios";
// @ts-ignore
import { convert } from "html-to-text";
import fs from "fs";
import ParseError from "../../../errors/parse-error";
import path from 'path'

// подключение словарей
const wordlistEng: string[] = wordListEng["english"];
const wordlistUS: string[] = wordListEng["english/american"];



let rusDictString: string = fs
  .readFileSync(path.join(__dirname,'..','..','..','assets','russian-words','russian.utf-8.txt'))
  .toString();

const wordlistRus: string[] = rusDictString.split("\n");

const wordlistCombined: string[] = [
  ...wordlistEng,
  ...wordlistUS,
  ...wordlistRus,
];

wordlistCombined.forEach(
  (e, index) => (wordlistCombined[index] = e.toLowerCase())
);

// запрашиваем html, получаем массив из всех слов больше 4х букв
const getText = async (URL: string): Promise<string[]> => {
  try {
    const resp = await axios({
      method: "get",
      url: URL,
      maxContentLength: Infinity,
    });
    const data: string = convert(resp.data);
    const dataArr: string[] | null = data.match(/[А-Яа-яёËA-Za-z-]{5,}/gi);
    if (!dataArr?.length) {
      throw ParseError.parsingFailed(URL);
    }
    return dataArr;
  } catch (e) {

    throw e;
  }
};

//найдем количество вхождений каждого элемента
const getElementQty = async (URL:string): Promise<{ word: string; qty: number }[]> => {
  const arr: string[] = await getText(URL);
  const arrWithQty: { word: string; qty: number }[] = [];

  arr.forEach((word) => {
    const index = arrWithQty.findIndex((e) => {
      return word === e.word;
    });
    if (index === -1) {
      arrWithQty.push({ word, qty: 1 });
    } else {
      arrWithQty[index].qty++;
    }
  });

  return arrWithQty;
};

const PDFData: { url: string; words: string[] }[] = [];

//отсортируем данные по количеству вхождений,
// добавим топ-3 в итоговый массив, предварительно проверив по словарям
const getFinalData = async (URL:string) => {
  const data = await getElementQty(URL);
  data.sort((a, b) => {
    return b.qty - a.qty;
  });
  const length = data.length <= 3 ? data.length : 3;
  let topWordList: string[] = [];
  for (let i = 0; i < data.length; i++) {
    if (topWordList.length < length) {
      if (wordlistCombined.includes(data[i].word.toLowerCase()))
        topWordList.push(data[i].word);
    } else break;
  }
  PDFData.push({ url: URL, words: topWordList });
};

// Заполнение итогового массива данных.
// Воспользуемся параллельным выполнением промисов
const getPDFData = async (URLList:string[]) => {
  const promises = URLList.map(getFinalData);
  await Promise.all(promises);
  return PDFData;
};
export default getPDFData;
