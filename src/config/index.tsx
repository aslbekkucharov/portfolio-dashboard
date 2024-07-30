import { AlignRightOutlined, CloudOutlined, ContainerOutlined, SolutionOutlined } from "@ant-design/icons"

export const links = [
    {
        to: '/',
        label: 'Посты',
        icon: <ContainerOutlined className="text-xl" />
    },
    {
        to: '/experience',
        label: 'Опыт работы',
        icon: <SolutionOutlined className="text-xl" />
    },
    {
        to: '/description',
        label: 'Описание',
        icon: <AlignRightOutlined className="text-xl" />
    },
    {
        to: '/files',
        label: 'Файлы',
        icon: <CloudOutlined className="text-xl" />
    }
]