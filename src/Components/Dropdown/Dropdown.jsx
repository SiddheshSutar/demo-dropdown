import styles from './dropdown.module.scss'
import {useState} from 'react'

const Dropdown = ({
    value,
    onChange
}) => {

    const [typedText, setTypedText] = useState('')

    const handleTypedTextChange = (e) => {
        setTypedText(e.target.value)
    }
    return (
        <div className={styles['container']}>
            <input
                value={typedText}
                onChange={handleTypedTextChange}
            />
        </div>
    );
}
 
export default Dropdown;