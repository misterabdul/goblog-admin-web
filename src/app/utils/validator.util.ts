import { ValidatorFn } from '@angular/forms';

export class ValidatorUtils {
  public static alnum: ValidatorFn = (control) => {
    const alnumRegex = new RegExp(/^[a-zA-Z0-9_]+$/);
    return alnumRegex.test(control.value)
      ? null
      : { alnumEror: 'only alpha numeric values are allowed' };
  };

  public static match(name: string): ValidatorFn {
    return (control) => {
      const parent = control.parent;
      let targetValue: any;
      if (parent !== null) targetValue = parent.get(name)?.value;

      return control.value === targetValue
        ? null
        : { matchError: 'value not match with: ' + name };
    };
  }
}
