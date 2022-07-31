import React, { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from 'containers/Auth'
import { routes } from 'constants/routes'

import css from './sidebar.module.scss'
import { Text } from '@blueprintjs/core'

const Sidebar: FunctionComponent = React.memo(() => {
    const { user } = useAuth()

    const menuItems = useMemo(() => {
        const result = [{
            id: routes.channels.id,
            title: routes.channels.title,
            to: routes.channels.path
        }]

        if (user?.channels.length) {
            user.channels.forEach((channel) => {
                result.push({
                    id: channel.id,
                    title: `Канал "${channel.name}"`,
                    to: routes.channelDetail.getUrl(channel.id)
                })
            })
        }

        return result
    }, [user]
    )
    return (
        <nav className={`${css.sidebar}`}>
            <ul className={css.list}>
                {menuItems.map((item) => {
                    return (
                        <li key={item.id}>
                            <NavLink to={item.to} className={css.link}>
                                <Text>
                                    {item.title}
                                </Text>
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
})

export { Sidebar }