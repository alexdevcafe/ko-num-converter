import Converter from './index';
import { errors, maxNumber } from './const';

const testSuites = [
  {
    suite: '0-10',
    data: [
      { num: 1, word: '일' },
      { num: 2, word: '이' },
      { num: 3, word: '삼' },
      { num: 4, word: '사' },
      { num: 5, word: '오' },
      { num: 6, word: '육' },
      { num: 7, word: '칠' },
      { num: 8, word: '팔' },
      { num: 9, word: '구' },
      { num: 10, word: '십' },
    ],
  },
  {
    suite: '11-99',
    data: [
      { num: 13, word: '십삼' },
      { num: 19, word: '십구' },
      { num: 27, word: '이십칠' },
      { num: 40, word: '사십' },
      { num: 82, word: '팔십이' },
      { num: 99, word: '구십구' },
    ],
  },
  {
    suite: '100-999',
    data: [
      { num: 100, word: '백' },
      { num: 195, word: '백구십오' },
      { num: 222, word: '이백이십이' },
      { num: 606, word: '육백육' },
      { num: 871, word: '팔백칠십일' },
      { num: 997, word: '구백구십칠' },
    ],
  },
  {
    suite: 'random big',
    data: [
      { num: 1659159, word: '백육십오만구천백오십구' },
      { num: 1000001, word: '백만일' },
      { num: 5050000, word: '오백오만' },
      { num: 19450290, word: '천구백사십오만이백구십' },
      { num: 1000010000, word: '십억만' },
      { num: 1000000010000, word: '조만' },
      { num: 5000000000000, word: '오조' },
    ],
  },
];

  describe('Input validation', () => {

      test(`It should return ${errors.empty} for empty input`, () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { error } = new Converter('').convert();
        expect(error).toBe(errors.empty);
      });

      ['!','@','#','$','%','^','&','*','(',')','_','+', NaN,].forEach(t => {
        test(`It should return ${errors.wrongFormat} for ${t}`, () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const { error } = new Converter(t).convert();
          expect(error).toBe(errors.wrongFormat);
        });
      })

      test(`It should return ${errors.maxNumber} for ${maxNumber}`, () => {
        const { error } = new Converter(maxNumber).convert();
        expect(error).toBe(errors.maxNumber);
      });

  });

testSuites.forEach((t) => {
  describe(t.suite, () => {
    t.data.forEach(({ num, word }) => {
      test(`${num} is ${word}`, () => {
        const { result } = new Converter(num).convert();
        expect(result).toBe(word);
      });
    });
  });
});
