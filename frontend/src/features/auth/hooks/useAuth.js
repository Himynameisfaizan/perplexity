import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../auth.slice";
import { getMe, login, register } from "../services/auth.api";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleRegister({ email, username, password }) {
    try {
      dispatch(setLoading(true));
      const data = await register({ username, email, password });
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "failed register"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await login({ email, password });
      dispatch(setUser(data.user));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "failed login"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "failer to fetch profile data"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }


  return{
    handleRegister, 
    handleLogin,
    handleGetMe
  }
}
