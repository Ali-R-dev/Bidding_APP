import { useEffect, useState } from 'react';
import { Modal, Button, Stack } from 'react-bootstrap'
import { getBotByUserId, updateBot } from '../services/itemService'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Notification = ({ show, handleClose, credentials, updateNoOfNotify }) => {

    const [NoticeList, setNoticeList] = useState([])


    const fetchBotData = async () => {

        const result = await getBotByUserId(credentials)
        if (result !== undefined) {

            setNoticeList(result.notifications)
            updateNoOfNotify(result.notifications.length)
        }
    }

    useEffect(async () => {
        await fetchBotData();
    }, [show])



    const handleClear = async () => {
        await updateBot({ notifications: [] }, credentials).then(
            async () => {
                await fetchBotData();
            }
        )
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Stack direction={"horizontal"} gap={5}>
                        <Modal.Title>Notifications</Modal.Title>
                        <Button onClick={handleClear}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                    </Stack>
                </Modal.Header>
                <Modal.Body>

                    <Stack direction={"vertical"} gap={1}>

                        {NoticeList?.map((note, index) => {
                            let classes = ['alert']
                            if (note.typeCode == 0) classes.push('alert-primary')
                            if (note.typeCode == 1) classes.push('alert-danger')
                            if (note.typeCode == 2) classes.push('alert-warning ')
                            return <div key={index} className={classes.join(' ')} role="alert" >
                                {note.message}
                            </div>

                        })}


                    </Stack>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default Notification;