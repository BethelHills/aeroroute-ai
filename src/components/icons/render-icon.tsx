import { createElement, type ComponentType, type SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export function renderIcon(
  Icon: IconComponent | undefined,
  props: SVGProps<SVGSVGElement>,
) {
  if (!Icon) return null;
  return createElement(Icon, props);
}
