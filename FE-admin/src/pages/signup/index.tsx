import { PageLayout } from "src/components";
import { SignUpForm } from "src/modules/auth";

export default function SignupPage() {
  return (
    <div className="w-full">
      <main className="w-full flex flex-wrap justify-center">
        <PageLayout>
          <h1>{"sign-up"}</h1>
          <SignUpForm />
          {/* <Snackbar
            isOpenSnackbar={true}
            isError={false}
            message="demo"
            handleCloseSnackBar={handleCloseSnackBar}
          /> */}
        </PageLayout>
      </main>
    </div>
  );
}
