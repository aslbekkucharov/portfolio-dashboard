import { CKEditor } from '@ckeditor/ckeditor5-react'
import type { EventInfo } from '@ckeditor/ckeditor5-utils'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

interface Props {
    value: string
    className?: string
    onChange: (value: string) => void
}

export default function BaseEditor(props: Props) {

    function handleEditorChange(event: EventInfo, editor: ClassicEditor) {
        const data = editor.getData()
        props.onChange(data)
    }

    return (
        <CKEditor
            data={props.value}
            editor={ClassicEditor}
            onChange={(e, editor) => handleEditorChange(e, editor)}
        />
    )
}