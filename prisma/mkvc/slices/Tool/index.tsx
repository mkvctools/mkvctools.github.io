import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Tool`.
 */
export type ToolProps = SliceComponentProps<Content.ToolSlice>;

/**
 * Component for "Tool" Slices.
 */
const Tool = ({ slice }: ToolProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for tool (variation: {slice.variation}) Slices
    </section>
  );
};

export default Tool;
