import styles from './dropdown.module.scss'
import { useState } from 'react'

const Dropdown = ({
    name = 'Basic Dropdown',
    value,
    onChange,
    placeHolder = '',
    loading,
    options
}) => {

    const [visible, setVisible] = useState(false)

    const handleTypedTextChange = (e) => {
        onChange(e.target.value)
    }

    return (
        <div className={styles['container']}>
            <div className={styles['wrapper']}>
                <div className={styles['input-container']}>
                    <input
                        name={name}
                        value={value}
                        onChange={handleTypedTextChange}
                        placeholder={placeHolder}
                        onFocus={() => setVisible(true)}
                        onBlur={() => setVisible(false)}
                    />
                    <div className={`${styles['right-caret']} ${visible && styles['hover']}`}>
                        &#10095;
                    </div>
                </div>
                {visible && <div className={styles['options-container']}>
                    {
                        loading &&
                        <div>
                            <i>
                                Loading....
                            </i>
                        </div>

                    }
                    {
                        !loading && options && <>
                            <div className={styles['list-container']}>
                                <ul>
                                    {
                                        options
                                            .filter(item => {

                                                if(!item || !item.name || !value) return true

                                                return value && item.name && item.name.toLowerCase().includes(value.toLowerCase())
                                            })
                                            .map((optionsObj, index) => (
                                            <li key={index}>
                                                {optionsObj.value}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </>
                    }
                </div>}
            </div>
        </div>
    );
}

export default Dropdown;