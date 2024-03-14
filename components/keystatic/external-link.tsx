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
      className="text-orange-600 hover:underline"
    />
  );
}
