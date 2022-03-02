import React, { useState } from 'react'
import { Button, Container, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BotConfig from './BotConfig'
import Notification from './Notification'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons'

const Layout = (props) => {

    const navigate = useNavigate()

    const { isAuth, logOut, credentials, headerTitle } = useAuth();
    const [ConfigModal, setConfigModal] = useState(false)
    const [NoticeModal, setNoticeModal] = useState(false)

    const location = useLocation();
    console.log(location.pathname);

    const handleLogOut = () => {
        logOut();
        navigate("/")
    }

    const HideConfigModal = () => {
        setConfigModal(false)
    }
    const ShowConfigModal = () => {
        setConfigModal(prev => true)
    }

    const HideNoticeModal = () => {
        setNoticeModal(false)
    }
    const ShowNoticeModal = () => {
        setNoticeModal(prev => true)
    }

    return (
        <>
            {isAuth() && credentials.role === 'regular' && <BotConfig show={ConfigModal} handleClose={HideConfigModal} credentials={credentials} />}

            {isAuth() && credentials.role === 'regular' && <Notification show={NoticeModal} handleClose={HideNoticeModal} credentials={credentials} />}

            <Container className='my-4'>
                <nav className="navbar navbar-light bg-light text-center" >
                    <div className="container-fluid">
                        <Link className="navbar-brand" to='/'>BIDDING APP</Link>
                        <span className='display-6'>{headerTitle}</span>
                        {/* <div>
                            <span>{credentials.userName}</span>
                            {credentials.id && <Button variant='ouline-primary' onClick={handleLogOut}>LOG OUT</Button>}
                        </div> */}

                        {credentials.id && <ButtonGroup>

                            <DropdownButton
                                variant='outline-secondary'
                                as={ButtonGroup}
                                align="end"
                                title={credentials.userName} id="bg-nested-dropdown">

                                {credentials.role == 'regular' && <Dropdown.Item eventKey="1" onClick={ShowConfigModal}>
                                    <span className='span me-2' >Autobidder</span>
                                    <FontAwesomeIcon icon={faGear} />
                                </Dropdown.Item>}

                                {credentials.role == 'regular' && <Dropdown.Item eventKey="2" onClick={ShowNoticeModal}>
                                    <span className='span me-2' >NoticeBoard</span>
                                    <FontAwesomeIcon icon={faGear} />
                                </Dropdown.Item>}

                                <Dropdown.Item eventKey="3" onClick={handleLogOut}>
                                    <span className='span me-2'>Log out</span>
                                    <FontAwesomeIcon icon={faRightFromBracket} />

                                </Dropdown.Item>
                            </DropdownButton>
                        </ButtonGroup>}

                    </div>
                </nav>
                {props.children}
            </Container>
        </>
    )
}
export default Layout;
