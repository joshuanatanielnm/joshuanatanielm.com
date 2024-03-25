import { handleStringLimit } from "@/utils/string";
import { Link2Icon } from "@radix-ui/react-icons";
import Link, { LinkProps } from "next/link";
import { ComponentPropsWithoutRef, useMemo } from "react";

type Props = LinkProps &
  Omit<ComponentPropsWithoutRef<"a">, "href"> & { isExternal?: boolean };

export function AdaptiveLink({
  href,
  isExternal,
  rel = "",
  target,
  ...props
}: Props) {
  const isActuallyExternal = useMemo(() => {
    if (typeof isExternal === "boolean") {
      return isExternal;
    }
    if (typeof href === "string") {
      return href.startsWith("http");
    }
    if (typeof href === "object") {
      return href.href?.startsWith("http");
    }
  }, [href, isExternal]);

  const externalProps = useMemo(() => {
    if (!isActuallyExternal) return {};
    return {
      rel: rel + " noopener noreferrer",
      target: "_blank",
    };
  }, [isActuallyExternal, rel]);

  return (
    <Link href={href} {...externalProps} {...props}>
      <div className="flex mt-auto gap-2">
        <Link2Icon className="my-auto" />
        <p className="flex md:hidden">
          {handleStringLimit(href.toString().replace(/(^\w+:|^)\/\//, ""), 25)}
        </p>
        <p className="hidden md:flex">
          {href.toString().replace(/(^\w+:|^)\/\//, "")}
        </p>
      </div>
    </Link>
  );
}
