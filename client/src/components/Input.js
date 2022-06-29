export default function Input({ setValue, multiline, children, ...props }) {
  const Component = multiline ? "textarea" : "input";

  return <Component onChange={(e) => setValue(e.target.value)} {...props} />;
}
