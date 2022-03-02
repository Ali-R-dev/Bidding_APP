import { useEffect, useState } from 'react';
import { Modal, Button, Stack } from 'react-bootstrap'
import { getBotByUserId, updateBot } from '../services/itemService'

const Notification = ({ show, handleClose, credentials }) => {

    const [NoticeList, setNoticeList] = useState([])


    const fetchBotData = async () => {

        const result = await getBotByUserId(credentials)
        if (result !== undefined) {
            let notice = { notifications: result.notifications }
            setNoticeList([...notice])
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
                    <Stack direction={"horizontal"} gap={2}>
                        <Modal.Title>Notifications</Modal.Title>
                        <Button onclick={handleClear}>clear</Button>
                    </Stack>
                </Modal.Header>
                <Modal.Body>

                    <Stack direction={"vertical"} gap={2}>

                        {NoticeList?.map((notice, index) => {
                            <div key={index} className="alert m-1" role="alert">
                                {notice}
                            </div>

                        })}


                    </Stack>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default Notification;