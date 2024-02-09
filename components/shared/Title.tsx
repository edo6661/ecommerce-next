import { montserrat } from "@/lib/utils";

const Title = ({ label, className }: { label: string; className?: string }) => {
  return (
    <h3
      suppressHydrationWarning
      className={`${montserrat.className} title ${className ? className : ""}`}
    >
      {label}
    </h3>
  );
};

export default Title;
