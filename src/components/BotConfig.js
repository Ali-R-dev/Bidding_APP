import { useEffect, useState } from 'react';
import { Modal, Button, Form, Stack } from 'react-bootstrap'
import { getBotByUserId, updateBot } from '../services/itemService'
const BotConfig = ({ show, handleClose, credentials }) => {

    const [Bot, setBot] = useState({ maxBalance: 0, notifyAt: 0 })


    const fetchBotData = async () => {

        const result = await getBotByUserId(credentials)
        if (result !== undefined) {
            const bot = { maxBalance: result.maxBalance, notifyAt: result.notifyAt }
            setBot(bot)
        }
    }

    useEffect(async () => {
        await fetchBotData();
    }, [show])

    const handleValueChange = (e) => {
        setBot(
            prev => {
                return { ...Bot, [e.target.name]: e.target.value }
            }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateBot(Bot, credentials).then(
            async () => {
                await fetchBotData();
            },
            rej => {
                console.log("rejected");
            }
        )
    }
    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Config AutoBidder</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {true && <div className="alert alert-warning text-center m-1" role="alert">
                        This is a warning alert—check it out!
                    </div>}

                    <Form onSubmit={handleSubmit}>
                        <Stack direction={"vertical"} gap={2}>

                            <div className='label'>Max Amount</div>
                            <input className='form-control'
                                id='maxBalance'
                                name='maxBalance'
                                value={Bot.maxBalance}
                                onChange={(e) => handleValueChange(e)}
                                type="number"
                                min={0}
                                required />

                            <div className='label'>Notify At (%)</div>
                            <input className='form-control'
                                id='notifyAt'
                                name='notifyAt'
                                value={Bot.notifyAt}
                                onChange={(e) => handleValueChange(e)}
                                type="number"
                                min={0}
                                max={100}
                                required />
                        </Stack>
                        <Button variant="primary" type='submit' className='m-2'>
                            Save Changes
                        </Button>
                    </Form>

                </Modal.Body>
            </Modal>
        </>
    );
}
export default BotConfig;