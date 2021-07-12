import { Convert } from './interfaces';
import { errors, maxNumber } from './const';

class Converter {
  private number: Array<string>;

  constructor(num: number) {
    this.number = this.handleInput(num);
  }

  private error = '' as string;

  private readonly koNumbers: string[] = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  private readonly smallUnits: string[] = ['', '십', '백', '천'];
  private readonly bigUnits: string[] = ['', '만', '억', '조'];

  private output: string[] = [];
  private visitedBigIndex: number[] = [];

  private handleInput(num: number): string[] {
    if (!num) {
      this.error = errors.empty;
    }

    const isValid: boolean = /^[0-9]*$/g.test(num.toString());
    if (!isValid) {
      this.error = errors.wrongFormat;
    }

    if (num >= maxNumber) {
      this.error = errors.maxNumber;
    }

    return num.toString().split('').reverse();
  }

  private stripTemp(curKoNum: string, index: number): string {
    return index === 0 ? curKoNum : curKoNum === '일' ? '' : curKoNum;
  }

  convert(): Convert {
    if (!this.error) {
      this.number.forEach((curDigit: string, index: number) => {
        const curKoNum: string = this.koNumbers[Number(curDigit)];
        const smIndex: number = index % 4;
        const bigIndex: number = Math.floor(index / 4);
        let temp = '';

        if (curKoNum) {
          temp = this.stripTemp(curKoNum, index) + this.smallUnits[smIndex];
          if (!this.visitedBigIndex[bigIndex]) {
            this.visitedBigIndex[bigIndex] = 1;
            temp += this.bigUnits[bigIndex];
          }
        }

        this.output = [temp, ...this.output];
      });
    }
    return {
      result: this.output.join(''),
      error: this.error
    };
  }
}

export default Converter;
