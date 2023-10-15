import styles from './dropdown.module.scss'
import { useState } from 'react'

const Dropdown = ({
    name = 'Basic Dropdown',
    value,
    onChange,
    placeHolder = '',
    loading = false,
    options
}) => {

    /** value being entered in text box */
    const [typedText, setTypedText] = useState(value)

    /** flag to control visibility of options */
    const [visible, setVisible] = useState(false)

    /** flag to control whether to show few options out of all options in list */
    const [shouldFilter, setShouldFilter] = useState(false)

    const handleTypedTextChange = (e) => {
        if (!shouldFilter) setShouldFilter(true)
        setTypedText(e.target.value)
    }

    const handleClickOption = (option) => {
        if (shouldFilter) setShouldFilter(false)
        if (visible) setVisible(false)
        setTypedText(option.name)
        onChange(option)
    }

    const filteredOptions = options
        .filter(item => {

            if (!shouldFilter) return true

            if (!item || !item.name || !typedText) return true

            return item.name.toLowerCase().includes(typedText.toLowerCase())
        })

    return (
        <div className={styles['container']}>

            <div className={styles['wrapper']}
                onMouseOut={() => setVisible(false)}
                onMouseOver={() => setVisible(true)}
            >
                <div className={styles['input-container']}>
                    <input
                        name={name}
                        value={typedText}
                        onChange={handleTypedTextChange}
                        placeholder={placeHolder}
                        autoComplete='off'
                    />
                    <div className={`${styles['right-caret']} ${visible && styles['hover']}`}>
                        &#10095;
                    </div>
                </div>
                {
                    visible && <div className={styles['options-container']}>
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
                                <ul className='select-list-ul' >
                                    {
                                        filteredOptions.map((optionsObj, index) => (
                                            <li className='select-list-li' key={index}
                                                onMouseDown={e => {
                                                    e.stopPropagation()
                                                    handleClickOption(optionsObj)
                                                }}
                                            >
                                                {optionsObj.value}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </>
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default Dropdown;