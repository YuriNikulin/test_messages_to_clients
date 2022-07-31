import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from 'constants/routes'
import { Layout } from './Layout'
import { Login } from 'pages/login'
import { Channels } from 'pages/channels'

const Router: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.channels.path} element={<Layout><Channels /></Layout>} />
                <Route path="*" element={<Layout />} />
            </Routes>
        </BrowserRouter>
    )
}

export { Router }