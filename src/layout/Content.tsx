import { Button, Flex } from "antd"
import { Outlet, useNavigate } from "react-router-dom"

import { tabs } from "@/config"
import Navbar from "@/components/Navbar"
import { PlusCircleOutlined } from "@ant-design/icons"

type Props = {}

function Content(props: Props) {

    const navigate = useNavigate()

    function onTabChange(key: string) {
        navigate(key)
    }

    return (
        <div className="w-full container px-5 py-7">
            <Flex justify="end">
                <Button onClick={() => navigate('/create-post')} type="default" size="large" icon={<PlusCircleOutlined />}>Добавить пост</Button>
            </Flex>
            <Navbar handleTabChange={onTabChange} items={tabs} className="my-4" />
            <Outlet />
        </div>
    )
}

export default Content