import { Card, Notification, toast as toa } from 'components/ui'
import React, { useEffect, useRef, useState } from 'react'

const NotificationToast = ({ message, type, duration = 2000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) {
        return null;
    }

    return (
        <Notification
            closable
            type={type}
            duration={duration}
            onClose={() => setVisible(false)}
            title={type.charAt(0).toUpperCase() + type.slice(1)}
        >
            {message}
        </Notification>
    );

}
export default NotificationToast