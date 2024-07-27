import Link from "next/link";
import { ReactNode } from "react";

interface NeonButtonProps {
    children: ReactNode
    href: string
  }
  const NeonButton: React.FC<NeonButtonProps> =({ children, href }:NeonButtonProps) => {
    return (
      <Link href={href} className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-full 
      hover:bg-purple-600 transition-colors duration-300
      shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.8)]">
          {children}
      </Link>
    );
  }

  export default NeonButton