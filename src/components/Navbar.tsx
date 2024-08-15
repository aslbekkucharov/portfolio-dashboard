import { TabItem } from "@/types"
import { Tabs } from "antd"

type Props = {
    items: TabItem[]
    className?: string
    handleTabChange?: (activeKey: string) => void
}

function ContentSwitcher({ items, className, handleTabChange }: Props) {

    const url = window.location.pathname

    return (
        <Tabs
            type="card"
            size="large"
            items={items}
            tabBarGutter={5}
            className={className}
            defaultActiveKey={url}
            onChange={handleTabChange}
            tabBarStyle={{ display: 'flex' }}
        />
    )
}

export default ContentSwitcher