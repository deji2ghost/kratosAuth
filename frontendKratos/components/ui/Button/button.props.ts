export default interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick?: () => void;
  variant?: "outline" | "solid" | "red";
  size?: "small" | "medium" | "large";
  loading?: boolean;
}
