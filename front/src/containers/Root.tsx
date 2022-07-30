import { Auth } from './Auth'
import { Router } from './Router'
import { ToastContainer } from 'react-toastify'

const Root: FunctionComponent = (props) => {
    return (
        <>
            <Auth>
                <Router />
            </Auth>
            <ToastContainer />
        </>
    )
}

export { Root }