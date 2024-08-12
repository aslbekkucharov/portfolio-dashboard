import { clsx } from 'clsx'
import { Button } from 'antd'
import { Link, NavLink, } from 'react-router-dom'
import { DashboardOutlined, LogoutOutlined } from '@ant-design/icons'

import { links } from '@/config'

type Props = {
    className: string
}

function SidebarLinks() {
    return (
        links.map(link => (
            <NavLink to={link.to} key={link.to} className='hover:bg-black/5 py-3 px-5 transition flex items-center gap-3'>
                {link.icon}
                <span className='leading-none'>{link.label}</span>
            </NavLink>
        ))
    )
}

function Sidebar({ className }: Props) {
    return (
        <div className={clsx('bg-white', className)}>
            <div className="wrapper mx-auto h-full">
                <div className='p-5 flex items-center justify-between'>
                    <Link to={'/'} className='inline-flex items-center gap-4'>
                        <DashboardOutlined className='text-3xl' />
                        <span className='font-medium leading-none'>Dashboard</span>
                    </Link>

                    <Button type='text' size='large' icon={<LogoutOutlined className='text-lg' />} />
                </div>

                <div className='flex flex-col'>
                    <SidebarLinks />
                </div>
            </div>
        </div>
    )
}

export default Sidebar