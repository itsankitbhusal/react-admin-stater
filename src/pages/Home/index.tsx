import { Header } from "antd/es/layout/layout"
import LoginForm from "../../features/Auth/Login"

const Home = () => {
  return (
    <div className=" h-screen">
      <div className=" h-full grid place-items-center">
      <LoginForm />
      </div>
    </div>
  )
}

export default Home