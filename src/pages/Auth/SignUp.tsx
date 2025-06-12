import AuthForm from "@components/auth/AuthForm"
import AuthLayout from "@layouts/AuthLayout"

function SignUp() {
  return (
    <AuthLayout>
      <AuthForm mode="signup"/>
    </AuthLayout>
  )
}

export default SignUp