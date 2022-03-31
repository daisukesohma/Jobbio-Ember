import { helper } from '@ember/component/helper';

export function capitalize(params/*, hash*/) {
  return `${params[0].charAt(0).toUpperCase()}${params[0].slice(1)}`;
}

export default helper(capitalize);
