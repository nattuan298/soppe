import "./styles.css";

interface StatusProps {
  active: boolean;
  value: string;
}
export const Status = ({ active, value }: StatusProps) => {
  return (
    <div>
      {active ? (
        <div className="status status-active text-center">
          <label>
            <span className="txt-status">{value}</span>
          </label>
        </div>
      ) : (
        <div className="status status-inactive">
          <label>
            <span className="txt-status">{value}</span>
          </label>
        </div>
      )}
    </div>
  );
};
