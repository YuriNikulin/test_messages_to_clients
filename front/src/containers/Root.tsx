import { Auth } from './Auth'
import { Router } from './Router'
import { ToastContainer } from 'react-toastify'
import React from 'react'

class Root extends React.PureComponent {
    render() {
        return (
            <>
                <Auth>
                    <Router />
                </Auth>
                <ToastContainer />
            </>
        )
    }
    
}

export { Root }