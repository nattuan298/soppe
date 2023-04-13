import CircularProgress, { CircularProgressProps } from "@material-ui/core/CircularProgress";

export function Spinner({ ...props }: CircularProgressProps) {
  return (
    <div className="flex justify-center">
      <CircularProgress {...props} />
    </div>
  );
}
