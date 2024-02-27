import type { LoaderProps } from "@/utils/interface";

const Loader = (props: LoaderProps) => {
  return (
    <span style={{
      width: props.size ? props.size : 20,
      height: props.size ? props.size : 20,
    }} className="rounded-full border-[2px] border-transparent border-t-white animate-spin" />
  )
}

export default Loader;