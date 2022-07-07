const base =
  "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 border rounded-md px-3 py-2";

export default function Input({ setValue, multiline, children, ...props }) {
  const Component = multiline ? "textarea" : "input";

  props.className = [base, props.className].join(" ").trim();

  return <Component onChange={(e) => setValue(e.target.value)} {...props} />;
}
