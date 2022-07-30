import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from '../constants'
import { Layout } from './Layout'
import { Login } from 'pages/login'

const Router: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.login.path} element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export { Router }