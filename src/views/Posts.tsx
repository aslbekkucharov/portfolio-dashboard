import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { EllipsisOutlined } from "@ant-design/icons"
import { App, Button, Dropdown, MenuProps, Table, TableColumnsType, Tag } from "antd"

import { truncate } from "@/utils"
import { api } from "@/plugins/api"
import { PostResponse } from "@/types"

export default function Posts() {

    const navigate = useNavigate()
    const { message } = App.useApp()
    const [data, setData] = useState<PostResponse[]>([])

    const actions: MenuProps['items'] = [
        {
            key: 'EDIT',
            label: 'Редактировать'
        },
        {
            danger: true,
            key: 'DELETE',
            label: 'Удалить'
        }
    ]

    const columns: TableColumnsType<PostResponse> = [
        {
            key: 'title',
            title: 'Заголовок',
            dataIndex: 'title',
            render: (content: string) => <span className="font-medium">{content}</span>
        },
        {
            key: 'excerpt',
            title: 'Описание',
            dataIndex: 'excerpt',
            render: (content: string) => <div>{truncate(content, 100)}</div>
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
            render: (_, record) => (
                <Dropdown trigger={['click']} menu={{ items: actions, onClick: (menu) => handleMenuItemClick(record, menu) }}>
                    <Button type="text" size="large" icon={<EllipsisOutlined className="text-2xl" />} />
                </Dropdown>
            )
        }
    ]

    function getPosts() {
        api.get('/posts').then((res) => {
            setData(() => res.data)
        })
    }

    function handlePostEdit(record: PostResponse) {
        navigate(`/edit-post/${record.id}`)
    }

    async function handlePostDelete(record: PostResponse) {
        api.delete(`/posts/${record.id}`).then(() => {
            message.success('Пост успешно удален!')
            getPosts()
        }).catch(() => {
            message.error('Что-то пошло не так!')
        })
    }

    function handleMenuItemClick(record: PostResponse, menu: any) {
        switch (menu.key) {
            case 'EDIT':
                handlePostEdit(record)
                break
            case 'DELETE':
                handlePostDelete(record)
                break
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return <Table dataSource={data} columns={columns} rowKey='id' pagination={{ hideOnSinglePage: true }} />
}