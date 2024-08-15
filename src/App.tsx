import ruRu from 'antd/locale/ru_RU'
import { ConfigProvider, App as AntWrapper } from "antd"

import { theme } from "@/theme"
import Content from "@/layout/Content"

function App() {
  return (
    <ConfigProvider theme={theme} locale={ruRu}>
      <AntWrapper message={{ maxCount: 1, duration: 1.5 }} className='max-w-3xl mx-auto h-full'>
        <div className="w-full h-full">
          <Content />
        </div>
      </AntWrapper>
    </ConfigProvider>
  )
}

export default App
