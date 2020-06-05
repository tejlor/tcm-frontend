export default function If(props) {
  if (props.cond === true)
    return props.children;
  else 
    return null;
}