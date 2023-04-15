import { ButtonLink } from "src/components";
import { moneyFormatter } from "src/lib/format";
import { routeSigninBase } from "src/constants/routes";

export default function Home() {
  return (
    <div className="w-full">
      <main className="w-full flex flex-wrap justify-center">
        <h1 className="py-4">Hello</h1>
        <p>Test currency format: {moneyFormatter.format(123456789.12)}</p>
        <ButtonLink to={routeSigninBase} variant="text" className="text-rose-800">
          {"sign-in"}
        </ButtonLink>
      </main>
    </div>
  );
}
