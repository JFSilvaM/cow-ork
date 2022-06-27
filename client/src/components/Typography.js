const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  xxl: "text-2xl",
  xxxl: "text-3xl",
  xxxxl: "text-4xl",
};

const alignments = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export default function Typography({
  as = "p",
  size = "md",
  align = "left",
  children,
  ...props
}) {
  const CustomTag = as;

  props.className = [sizes[size], alignments[align], props.className]
    .join(" ")
    .trim();

  return <CustomTag children={children} {...props} />;
}
