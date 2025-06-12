import AuthForm from "@components/auth/AuthForm";
import AuthLayout from "@layouts/AuthLayout";

function Login() {
  return (
    <AuthLayout>
      <AuthForm mode="login" />
    </AuthLayout>
  )
}

export default Login