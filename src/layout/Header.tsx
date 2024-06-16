import clsx from 'clsx'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LogoutOutlined, PlusOutlined } from '@ant-design/icons'

export default function Header(props: { className: string }) {

    const navigate = useNavigate()

    function handleCreatePost() {
        navigate('/create-post')
    }

    return (
        <header className={ clsx("py-3 bg-white", props.className) }>
            <div className="wrapper mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full inline-flex items-center justify-center bg-black">
                        <span className="text-white font-medium leading-none">02</span>
                    </span>
                    <span className="font-medium">Aslbek Kucharov</span>
                </Link>

                <div className="flex items-center gap-2">
                    <Button onClick={handleCreatePost} type="text" icon={<PlusOutlined />} iconPosition="end" size="large">
                        <span className="font-medium text-sm">Создать пост</span>
                    </Button>
                    <Button type="primary" icon={<LogoutOutlined />} iconPosition="end" size="large">
                        <span className="font-medium text-sm">Выйти</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}