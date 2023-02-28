import { Controller, Get } from '@nestjs/common';

@Controller()
export class LexicographicallyController {
  @Get('/lexicographically')
  async getSubstrings(): Promise<string> {
    const arr: string[] = ['11', '12', 'cii', '001', '2', '1998', '7', '89', 'iia', 'fii'];

    const ciiSubstring: Set<string> = new Set();
    const iiaSubstring: Set<string> = new Set();
    const fiiSubstring: Set<string> = new Set();
    const S: Set<string> = new Set();

    for (const elem of arr) {
      if (/^[a-zA-Z]+$/.test(elem)) {
        S.add(elem);
        if (elem === 'cii') {
          for (let i = 0; i < elem.length; i++) {
            for (let j = i + 1; j <= elem.length; j++) {
              ciiSubstring.add(elem.substring(i, j));
            }
          }
        } else if (elem === 'iia') {
          for (let i = 0; i < elem.length; i++) {
            for (let j = i + 1; j <= elem.length; j++) {
              iiaSubstring.add(elem.substring(i, j));
            }
          }
        } else if (elem === 'fii') {
          for (let i = 0; i < elem.length; i++) {
            for (let j = i + 1; j <= elem.length; j++) {
              fiiSubstring.add(elem.substring(i, j));
            }
          }
        }
      }
    }

    const ciiSubstrings: string[] = [...ciiSubstring].sort();
    const iiaSubstrings: string[] = [...iiaSubstring].sort();
    const fiiSubstrings: string[] = [...fiiSubstring].sort();
    const allSubstrings: string[] = [...S, ...ciiSubstring, ...iiaSubstring, ...fiiSubstring].sort();

    return JSON.stringify({
      cii: ciiSubstrings,
      iia: iiaSubstrings,
      fii: fiiSubstrings,
      S: allSubstrings,
    }, null, "\t");
  }
}