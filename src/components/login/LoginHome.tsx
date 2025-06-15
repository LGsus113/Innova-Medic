import MarcaLogo from "@src/components/login/elements/MarcaLogo";
import Wrap from "@src/components/login/elements/Wrap";
import LoginForm from "@src/components/login/elements/LoginForm";
import SignForm from "@src/components/login/elements/SignForm";

export default function LoginHome() {
  return (
    <>
      <MarcaLogo superposition="z-50" />
      <div className="z-20 relative w-full block overflow-hidden">
        <div className="w-full min-h-screen flex justify-center items-center">
          <div className="relative w-full block my-auto text-center">
            <h6 className="text-5xl pb-5 font-Cherry-Bomb tracking-wide text-pink-600 text-shadow-custom">
              <span>Log In</span>
              <span>Sign Up</span>
            </h6>
            <input
              className="checkbox"
              type="checkbox"
              id="reg-log"
              name="reg-log"
            />
            <label htmlFor="reg-log"></label>

            <div className="card-3d-wrap mx-auto relative w-[440px] max-w-full h-[400px] mt-[60px]">
              <div className="card-3d-wrapper size-full absolute top-0 left-0">
                <div className="card-front back-front customer-bg">
                  <Wrap title="Log in">
                    <LoginForm />
                  </Wrap>
                </div>
                <div className="card-back back-front customer-bg">
                  <Wrap title="Sign in">
                    <SignForm />
                  </Wrap>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
