import { ComponentType, Suspense } from "react";

export function loadable(Component: ComponentType) {
  return function Loadable({ ...rest }) {
    return (
      <div className="w-full">
        <Suspense fallback={<div></div>}>
          <Component {...rest} />
        </Suspense>
      </div>
    );
  };
}
