import { TabItem } from "@/types"
import { Icon } from '@iconify/react'

export const tabs: TabItem[] = [
    {
        key: '/',
        label: 'Посты',
        icon: <Icon icon="iconoir:post" className="text-xl" />
    },
    {
        key: '/about',
        label: 'About',
        icon: <Icon icon="material-symbols:account-circle-full" className="text-xl" />
    }
]