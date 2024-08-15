import { Button, DatePicker, Flex, Input, Select, Typography } from "antd"
import { useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"

import { About, Experience } from "@/types"
import Editor from "@/components/editor/Editor"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"

type Props = {
    isEditing: boolean
    initialValues?: About & { id?: number }
}

type FormConfig = {
    formTitle: string
    formEndpoint: string
    formButtonLabel: string
    formMethod: 'post' | 'put' | 'patch' | 'get'
}

function AboutForm(props: Props) {

    const { TextArea } = Input
    const navigator = useNavigate()
    const [isFetching, setIsFetching] = useState<boolean>(false)

    const [experience, setExperience] = useState<Experience>({
        companyTitle: '',
        aboutCompany: '',
        companyStack: [],
        period: { from: '', to: '' }
    })

    const [about, setAbout] = useState<About>({
        bio: '',
        experiences: [],
        ownedSkills: [],
        fullname: 'Aslbek Kucharov',
        position: 'Software Developer',
        globalUsername: '@aslbekkucharov',
        volunteering: 'I have been part of the Telegram support team for over 3 years (Google: TSF)',
    })

    useEffect(() => {
        props.isEditing ? setAbout((prevVal) => ({ ...prevVal, ...props.initialValues })) : null
    }, [props.initialValues])

    const formConfig = useMemo<FormConfig>(() => {
        return {
            formEndpoint: '/about',
            formButtonLabel: 'Сохранить',
            formMethod: props.isEditing ? 'patch' : 'post',
            formTitle: props.isEditing ? 'Редактирование информации' : 'О себе',
        }
    }, [props.initialValues])


    function handleFullNameChange(name: string) {
        setAbout((prevVal) => ({ ...prevVal, fullname: name }))
    }

    function handleBioChange(name: string) {
        setAbout((prevVal) => ({ ...prevVal, bio: name }))
    }

    function handlePositionChange(position: string) {
        setAbout((prevVal) => ({ ...prevVal, position }))
    }

    function handleVolunteeringChange(volunteering: string) {
        setAbout((prevVal) => ({ ...prevVal, volunteering }))
    }

    function handleSkillSelect(value: string[]) {
        console.log(value)
    }

    function handleExperienceDateFromChange(dateFrom: string | Date) {
        setExperience((prevVal) => ({
            ...prevVal,
            period: {
                ...prevVal.period,
                from: dateFrom
            }
        }))
    }

    function handleExperienceDateToChange(dateTo: string | Date) {
        setExperience((prevVal) => ({
            ...prevVal,
            period: {
                ...prevVal.period,
                to: dateTo
            }
        }))
    }

    function handleCompanyNameChange(name: string) {
        setExperience((prevVal) => ({ ...prevVal, companyTitle: name }))
    }

    function handleCompanyTechStackSelect(value: string[]) {
        setExperience((prevVal) => ({ ...prevVal, companyStack: value }))
    }

    function handlePostAction() {
        console.log('Post actions')
    }

    return (
        <div className="bg-white p-5 sm:rounded-xl">
            <Flex gap={20} vertical className="mb-10">
                <Typography.Title level={3}>{formConfig.formTitle}</Typography.Title>

                <Flex gap={15}>
                    <Input
                        size="large"
                        placeholder="Введите имя и фамилию"
                        value={about.fullname} onChange={(e) => handleFullNameChange(e.target.value)}
                    />

                    <Input
                        size="large"
                        placeholder="Должность"
                        value={about.position} onChange={(e) => handlePositionChange(e.target.value)}
                    />
                </Flex>

                <Editor
                    value={about.bio}
                    onChange={handleBioChange}
                    placeholder="Введите краткую информацию о себе"
                />

                <TextArea
                    rows={3}
                    showCount
                    size="large"
                    maxLength={100}
                    style={{ resize: 'none' }}
                    value={about.volunteering}
                    placeholder="Введите краткое описание статьи"
                    onChange={(e) => handleVolunteeringChange(e.target.value)}
                />

                <Select
                    size="large"
                    mode="multiple"
                    allowClear={true}
                    style={{ width: '100%' }}
                    onChange={handleSkillSelect}
                    placeholder="Выберите навыки которые вы имеете"
                />
            </Flex>

            <Flex gap={10} vertical className="mb-8">
                <Typography.Title level={3}>Опыт работы</Typography.Title>

                <Flex gap={15} className="mb-3">
                    <DatePicker onChange={handleExperienceDateFromChange} size="large" placeholder="Выберите дату начала" style={{ width: '100%' }} />
                    <DatePicker onChange={handleExperienceDateToChange} size="large" placeholder="Выберите дату окончания" style={{ width: '100%' }} />
                </Flex>

                <Input
                    size="large"
                    placeholder="Введите название компании"
                    value={experience.companyTitle} onChange={(e) => handleCompanyNameChange(e.target.value)}
                />

                <Editor
                    value={about.bio}
                    wrapperClassName="mb-3"
                    onChange={handleBioChange}
                    placeholder="Введите ваш опыт в компании"
                />

                <Select
                    size="large"
                    mode="multiple"
                    allowClear={true}
                    style={{ width: '100%' }}
                    onChange={handleCompanyTechStackSelect}
                    placeholder="Укажите стек технологий этой компании"
                />
            </Flex>

            <Button onClick={handlePostAction} loading={isFetching} icon={isFetching ?? <LoadingOutlined />} className="py-5" type="primary" size="large" block>
                {isFetching ? null : <span>{formConfig.formButtonLabel}</span>}
            </Button>
        </div>
    )
}

export default AboutForm