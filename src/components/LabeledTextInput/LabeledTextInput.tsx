import React, {
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useRef,
    useState,
  } from 'react';
  import {
    View,
    Text,
    TextInput,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
  } from 'react-native';
  

  import { useFocusEffect } from '@react-navigation/native';
import useValidation from '../../hooks/useValidation';
  
  export type validationTypes =
    | 'Mobile Number'
    | ''
  
  
  type LabeledTextInputProps = {
    label: validationTypes;

  };
  
  
  const LabeledTextInput: FC<LabeledTextInputProps> = ({
    label,

  }) => {

    const {validateField} = useValidation();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [value, setValue] = useState<string>(defaultValue);
    const [onBlurDone, setOnBlurDone] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
  
    const inputRef = useRef<TextInput | null>(null);

  

    const handleOnChangeText = (value: string) => {
  
      setValue(value);
      onChange(value);
      isChange(true);
      handleOnChange(value)
      // setErrorMessage('');
    };
  
    const handleOnChange = (value: string) => {
      if (isPrefixedType(label) && value === '.') {
        return;
      }
      // console.log("addOrUpdateError",value);
  
      setOnBlurDone(false);
      setErrorMessage('');
      setValue(value);
      onChange(value);
      isChange(true);
  
      let formattedValue = isPrefixedType(label)
        ? RemovePrefixes(String(value))
        : value;
  
      const {errorFlag, error} = validateField({
        FieldName: label,
        value: formattedValue ? formattedValue : value,
      });
      // console.log("addOrUpdateError",error);
  
      setIsError(errorFlag);
      setErrorMessage(error);
      addOrUpdateError(label, errorFlag);
    };
  
    const addOrUpdateError = (label: validationTypes, hasError: boolean) => {
      
      const index = IsErrorArray.findIndex(error => error.label === label);
      if (index !== -1) {
        const updatedError = {...IsErrorArray[index], hasError};
        const updatedErrors = [...IsErrorArray];
        updatedErrors.splice(index, 1, updatedError);
        setErrorFlag(updatedErrors);
      } else {
        const newErrorObject: ErrorObject = {label, hasError};
        setErrorFlag(prevState => [...prevState, newErrorObject]);
      }
    };
  
    useFocusEffect(
      React.useCallback(() => {
        if (defaultValue) {
          setValue(defaultValue);
        }
      }, [defaultValue])
    );
  
  
    useEffect(() => {
      if (isSameAsKYCCurrent) {
        setErrorMessage('');
      }
    }, [isSameAsKYCCurrent]);
  
    useEffect(() => {
      if (isSameAsKYCPermanent) {
        setErrorMessage('');
      }
    }, [isSameAsKYCPermanent]);
  
    const handleOnBlur = () => {
      handleOnChange(value);
      setOnBlurDone(true);
      setIsFocused(false);
    };
  
    const handleKeyPress = (
      event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    ) => {
      if (event.nativeEvent.key === '.') {
        event.preventDefault();
      }
    };
    // console.log("isError", label, defaultValue, isError, errorMessage);
  
    return (
      <View style={[containerbox, {width: halfSize ? '45%' : '90%'}]}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              labelStyle,
              {color: isFocused ? Colors.Black : Colors.LabelGrey},
            ]}>
            {label}{' '}
          </Text>
          {mandatory && <Icon name="pointed-star" />}
        </View>
        <TextInput
          style={[
            inputbox,
            {borderColor: isFocused ? Colors.Black : Colors.LightGrey},
          ]}
          placeholder={placeholder || ''}
          placeholderTextColor={Colors.PlaceHolderGrey}
         
          onChangeText={handleOnChangeText}
          onBlur={handleOnBlur}
          keyboardType={NumberPad ? 'decimal-pad' : 'name-phone-pad'}
          value={
            isPrefixedType(label) && defaultValue
              ? ConvertToPrefixedAmount(String(defaultValue))
              : defaultValue
          }
          onFocus={() => setIsFocused(true)}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          textContentType="none"
          autoCorrect={false}
          editable={!disabled}
          onKeyPress={e => handleKeyPress(e)}
        />
        {isError && <Text style={styles.errorMessagge}>{errorMessage}</Text>}
      </View>
    );
  };
  
  export default LabeledTextInput;