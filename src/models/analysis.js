import { analysis } from './urls';

export default [
  {
    key: 'analysis.factor3',
    method: 'post',
    url: () => `${analysis}factor3`,
    resultKey: 'data',
  },
  {
    key: 'analysis.factor5',
    method: 'post',
    url: () => `${analysis}factor5`,
    resultKey: 'data',
  },
  {
    key: 'analysis.factor6',
    method: 'post',
    url: () => `${analysis}factor6`,
    resultKey: 'data',
  },
];