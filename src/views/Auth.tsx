import { useEffect, useState } from "react"
import { LoadingOutlined, LoginOutlined } from "@ant-design/icons"
import { Button, ConfigProvider, Input, Space, Typography } from "antd"

import { theme } from "@/theme"
import { api } from "@/plugins/api"
import { AuthSuccess } from "@/types"
import { useAuth } from "@/context/auth"
import { Navigate, useNavigate } from "react-router-dom"

type AuthPayload = {
    username: string
    password: string
}

function Auth() {

    const navigate = useNavigate()
    const { saveToken, isAuthenticated } = useAuth()
    const [isSigning, setIsSigning] = useState(false)
    const [credentials, setCredentials] = useState<AuthPayload>({ username: '', password: '' })

    function handleUsernameChange(payload: string) {
        setCredentials((prevCredentials) => ({ ...prevCredentials, username: payload }))
    }

    function handlePasswordChange(payload: string) {
        setCredentials((prevCredentials) => ({ ...prevCredentials, password: payload }))
    }

    async function handleLogin() {
        try {

            setIsSigning(true)

            const response = await api.post<AuthSuccess>('/auth/signin', credentials)

            if (response.status === 201) {
                saveToken(response.data.token)
                navigate('/')
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsSigning(false)
        }
    }

    return (
        isAuthenticated ?
            <Navigate to='/' />
            :
            <ConfigProvider theme={theme}>
                <div className="h-full flex items-center justify-center">
                    <div className="w-full max-w-sm bg-white p-8 rounded-xl">
                        <Space direction="vertical" size={0} className="w-full mb-5">
                            <Typography.Title level={3} className="!mb-2 text-center !text-slate-700">Вход в аккаунт</Typography.Title>
                            <Typography.Paragraph className="text-sm text-slate-500 text-center">Войдите в свой аккаунт чтобы управлять своим сайтом</Typography.Paragraph>
                        </Space>
                        <Space direction="vertical" size={15} className="w-full">
                            <Input value={credentials.username} onChange={(e) => handleUsernameChange(e.target.value)} size="large" placeholder="Введите имя пользователя" />
                            <Input.Password value={credentials.password} onChange={(e) => handlePasswordChange(e.target.value)} size="large" placeholder="Введите пароль" />
                            <Button onClick={handleLogin} type="primary" size="large" icon={isSigning ? <LoadingOutlined /> : <LoginOutlined />} block>
                                {isSigning ? null : <span>Войти</span>}
                            </Button>
                        </Space>
                    </div>
                </div>
            </ConfigProvider>
    )
}

export default Auth