import { useEffect, useState, type FormEvent } from "react";
import styles from "./Login.module.css";
import { useAuth } from "@contexts";
import { useNavigate } from "react-router-dom";
import { Button, BUTTON_TYPES } from "@components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) login?.(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button
            type={BUTTON_TYPES.PRIMARY}
            onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
              e?.preventDefault();
              // navigate("/");
            }}
          >
            <>Login</>
          </Button>
        </div>
      </form>
    </main>
  );
}
