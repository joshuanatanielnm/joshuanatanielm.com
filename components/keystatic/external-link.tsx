import Link, { LinkProps } from "next/link";
import { ComponentPropsWithoutRef, useMemo } from "react";

type Props = LinkProps &
  Omit<ComponentPropsWithoutRef<"a">, "href"> & { isExternal?: boolean };

export function ExternalLink({
  href,
  isExternal = true,
  rel = "",
  target,
  ...props
}: Props) {
  const targetProps = useMemo(() => {
    if (isExternal) {
      return {
        rel: rel + " noopener noreferrer",
        target: "_blank",
      };
    }
    return {};
  }, [isExternal, rel]);

  return (
    <Link
      href={href}
      {...targetProps}
      {...props}
      className="font-medium text-brand underline decoration-brand/30 underline-offset-2 transition-colors hover:decoration-brand"
    />
  );
}
