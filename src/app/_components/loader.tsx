import type { LoaderProps } from "@/utils/interface";

const Loader = (props: LoaderProps) => {
  return (
    <span
      style={{
        width: props.size ? props.size : 20,
        height: props.size ? props.size : 20,
      }}
      className="animate-spin rounded-full border-[2px] border-transparent border-t-white"
    />
  );
};

export default Loader;
