import { Input } from "../../components/Input/Input";
import { Logo } from "../../components/Logo/Logo";

function Login() {
  return (
    <>
      <Logo />
      <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
        <div className="flex flex-col gap-6 items-center justify-center">
          <Input
            type="text"
            name="email"
            id="email"
            label="Email"
            placeholder="Seu e-mail"
            fullWidth
            noLabel
          />
          <Input
            type="password"
            name="password"
            id="password"
            label="Senha"
            placeholder="Senha"
            fullWidth
            noLabel
          />
        </div>
      </section>
    </>
  );
}

export default Login;
