import { montserrat } from "@/lib/utils";

const Title = ({ label, className }: { label: string; className?: string }) => {
  return (
    <h3 className={`${montserrat.className} title ${className}`}>{label}</h3>
  );
};

export default Title;
