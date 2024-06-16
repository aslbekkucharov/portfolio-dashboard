import { theme } from "@/theme"
import Header from "@/layout/Header"
import Content from "@/layout/Content"
import { ConfigProvider } from "antd"

function App() {

  return (
    <ConfigProvider theme={theme}>
      <Header className="px-5 mb-10" />
      <Content />
    </ConfigProvider>
  )
}

export default App
