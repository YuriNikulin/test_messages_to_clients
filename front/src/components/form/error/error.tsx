import { useMemo } from "react"
import { IErrorProps } from "./error-types"

export const Error: FunctionComponent<IErrorProps> = (props) => {
    const error = useMemo(() => {
        return props.meta.error || props.meta?.submitError
    }, [props.meta])
    
    return (
        <span className="error">
            {error && props.meta.touched && error}
        </span>
    )
}
