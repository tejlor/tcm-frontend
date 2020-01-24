export function Enum(value, label){
  return {
    value: value, 
    label: label
  };
}

export function enum2ComboBox(enumObj) {
  return Object.keys(enumObj).map(key => enumObj[key]);
}