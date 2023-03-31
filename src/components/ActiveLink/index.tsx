import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React, { cloneElement, ReactNode } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactNode;
  activeClassName: string;
}

export function ActiveLink({
  activeClassName,
  children,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();
  const className = asPath === rest.href ? activeClassName : "";

  return (
    <Link {...rest} className={className}>
      {children}
    </Link>
  );
}
