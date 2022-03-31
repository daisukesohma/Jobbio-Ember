import { helper } from '@ember/component/helper';

export function contains([a, b]) {
  return a.includes(b) ? true : false;
}

export default helper(contains);
