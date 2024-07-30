import Column from "antd/es/table/Column";
import { Button, Dropdown, MenuProps, Table, TableColumnsType, Tag } from "antd"

import { Post } from "@/types";
import { useLoaderData, useNavigate } from "react-router-dom";
import { EllipsisOutlined, PlusCircleOutlined } from "@ant-design/icons";

export default function Posts() {

    const navigate = useNavigate()

    const data = useLoaderData() as Post[]

    const actions: MenuProps['items'] = [
        {
            key: 'edit',
            label: 'Редактировать'
        },
        {
            danger: true,
            key: 'delete',
            label: 'Удалить'
        }
    ]

    const columns: TableColumnsType<Post> = [
        {
            key: 'title',
            title: 'Заголовок',
            dataIndex: 'title',
        },
        {
            key: 'content',
            title: 'Описание',
            dataIndex: 'content',
            render: (content: string) => content.slice(0, 100) + '…'
        },
        {
            key: 'isActive',
            title: 'Статус',
            dataIndex: 'isActive',
            render: (status: boolean) => <Tag color={status ? 'success' : 'error'}>{status ? 'Активен' : 'Не активен'}</Tag>
        },
        {
            key: 'actions',
            title: 'Действия',
            dataIndex: 'actions',
            render: () => (
                <Dropdown trigger={['click']} menu={{ items: actions }}>
                    <Button type="text" size="large" icon={<EllipsisOutlined className="text-2xl" />} />
                </Dropdown>
            )
        }
    ]

    return (
        <>
            <div className="flex justify-end mb-6">
                <Button onClick={() => navigate('/create-post')} type="default" size="large" icon={<PlusCircleOutlined />}>Добавить пост</Button>
            </div>
            
            <Table dataSource={data} columns={columns} rowKey='id' pagination={{ hideOnSinglePage: true }} />
        </>
    )
}