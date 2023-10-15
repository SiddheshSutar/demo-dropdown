import styles from './dropdown.module.scss'
import {useState} from 'react'

const Dropdown = ({
    name='Basic Dropdown',
    value,
    onChange,
    placeHolder = '',
}) => {

    const [typedText, setTypedText] = useState('')

    const handleTypedTextChange = (e) => {
        setTypedText(e.target.value)
    }
    return (
        <div className={styles['container']}>
            <input
                name={name}
                value={typedText}
                onChange={handleTypedTextChange}
                placeholder={placeHolder}
            />
        </div>
    );
}
 
export default Dropdown;