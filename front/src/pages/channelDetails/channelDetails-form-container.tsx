import { useCallback } from "react"
import { Form } from "react-final-form"
import { ChannelFormView } from './channelForm-form-view'

const ChannelFormContainer: FunctionComponent = (props) => {
    const handleSubmit: FormSubmitHandler = useCallback((values) => {
        console.log(values)
    }, [])

    return (
        <ChannelFormView onSubmit={handleSubmit} />
    )
}

export { ChannelFormContainer }