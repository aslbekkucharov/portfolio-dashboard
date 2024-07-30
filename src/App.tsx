import ruRu from 'antd/locale/ru_RU'
import { ConfigProvider, App as AntWrapper } from "antd"

import { theme } from "@/theme"
import Content from "@/layout/Content"
import Sidebar from "@/layout/Sidebar"

function App() {
  return (
    <ConfigProvider theme={theme} locale={ruRu}>
      <AntWrapper message={{ maxCount: 1, duration: 1.5 }} className='h-full'>
        <div className="flex h-full">
          <Sidebar className="max-w-[300px] h-full w-full border-r border-slate-200" />
          <Content />
        </div>
      </AntWrapper>
    </ConfigProvider>
  )
}

export default App
