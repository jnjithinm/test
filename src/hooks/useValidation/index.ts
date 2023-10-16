

interface ValidationProps {
  FieldName: string;
  value: string;
}

const useValidation = () => {
  const validateField = ({ FieldName, value }: ValidationProps) => {

    const onlyDigits = /^\d+$/;
    const nameincludeSpacesRegex = /^[a-zA-Z\s]{2,}$/;
    const addressLeadRegex = /^[a-zA-Z0-9\s,/.'"-]*$/;
    const VPA_REGEX = /^[\w.-]+@[\w.-]+$/;
    const countPDC = /^[0-9][0-9]*$/;

    let errorFlag = false;
    let error = '';

    switch (FieldName) {

   

      case 'Mobile Number':
        const mobileNumberRegex = /^[6-9]\d{9}$/;
        let length = value.length;
        if (value === '') {
          errorFlag = true;
          error = 'Mobile number is required';
        } else if (!mobileNumberRegex.test(value)) {
          errorFlag = true;
          if (!onlyDigits.test(value)) {
            error = 'Only digit values are allowed for a Mobile Number.';
          } else if (
            !value.startsWith('6') &&
            !value.startsWith('7') &&
            !value.startsWith('8') &&
            !value.startsWith('9')
          ) {
            error = `A Mobile Number(+91) should starts with a digit between 6 and 9.`;
          } else if (length !== 10) {
            error = 'A Mobile Number(+91) should contain 10 digits.';
          } else {
            error = 'Invalid Mobile Number';
          }
        }
        break;

        case 'E-mail ID':
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (value === '') {
            errorFlag = true;
            error = 'Email ID is required';
          } else if (!emailRegex.test(value)) {
            errorFlag = true;
            if (!value.includes('@')) {
              error = 'Email ID should contain the @ symbol';
            } else if (value.startsWith('@')) {
              error = 'Email ID should not start with the @ symbol';
            } else if (value.endsWith('@')) {
              error = 'Email ID should not end with the @ symbol';
            } else if (value.indexOf('@') !== value.lastIndexOf('@')) {
              error = 'Email ID should contain only one @ symbol';
            } else if (value.includes(' ')) {
              error = 'Email ID should not contain spaces';
            } else {
              error = 'Please enter a valid email ID';
            }
          }
          break;

    }
    return {
      errorFlag,
      error,
    };
  };

  return { validateField };
};

export default useValidation;
