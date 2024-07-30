import { ConfigProvider } from "antd"

import { theme } from "@/theme"
import Content from "@/layout/Content"
import Sidebar from "@/layout/Sidebar"

function App() {

  return (
    <ConfigProvider theme={theme}>
      <div className="flex h-full">
        <Sidebar className="max-w-[300px] h-full w-full border-r border-slate-200" />
        <Content />
      </div>
    </ConfigProvider>
  )
}

export default App
