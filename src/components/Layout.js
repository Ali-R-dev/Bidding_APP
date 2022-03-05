import React, { useState } from 'react'
import { Button, Stack, Container, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BotConfig from './BotConfig'
import Notification from './Notification'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faGear, faBell } from '@fortawesome/free-solid-svg-icons'

const Layout = (props) => {

    const navigate = useNavigate()

    const { isAuth, logOut, credentials, headerTitle } = useAuth();
    const [ConfigModal, setConfigModal] = useState(false)
    const [NoticeModal, setNoticeModal] = useState(false)
    const [noOfNotify, setNoOfNotify] = useState(0)


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
    const updateNoOfNotify = (no) => {
        setNoOfNotify(no)
    }

    return (
        <>
            {isAuth() && credentials.role === 'regular' && <BotConfig show={ConfigModal} handleClose={HideConfigModal} credentials={credentials} />}

            <Container className='my-4'>
                <nav className="navbar navbar-light bg-light text-center sm-4" >
                    <div className="container-fluid">
                        <Link className="navbar-brand" to='/'>BIDDING APP</Link>
                        <span className='h1-6'>{headerTitle}</span>

                        {credentials.id && <Stack direction="horizontal" gap={2}>

                            {credentials.role == 'regular' &&

                                <>
                                    <Button
                                        variant='outline-secondary'
                                        className='position-relative'
                                        onClick={ShowNoticeModal}>
                                        <FontAwesomeIcon icon={faBell} />
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{noOfNotify > 0 ? "" + noOfNotify : ''}</span>
                                    </Button>
                                    <Notification
                                        show={NoticeModal}
                                        updateNoOfNotify={updateNoOfNotify}
                                        handleClose={HideNoticeModal}
                                        credentials={credentials} />
                                </>
                            }
                            <ButtonGroup>
                                <DropdownButton
                                    variant='outline-secondary'
                                    as={ButtonGroup}
                                    align="end"
                                    title={credentials.userName} id="bg-nested-dropdown">

                                    {credentials.role == 'regular' && <Dropdown.Item eventKey="1" onClick={ShowConfigModal}>
                                        <span className='span me-2' >Autobidder</span>
                                        <FontAwesomeIcon icon={faGear} />
                                    </Dropdown.Item>}

                                    <Dropdown.Item
                                        eventKey="2"
                                        onClick={handleLogOut}>
                                        <span className='span me-2'>Log out</span>
                                        <FontAwesomeIcon icon={faRightFromBracket} />

                                    </Dropdown.Item>
                                </DropdownButton>
                            </ButtonGroup>
                        </Stack>
                        }

                    </div>
                </nav>
                {props.children}
            </Container>
        </>
    )
}
export default Layout;
