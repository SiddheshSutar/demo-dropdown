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

    const [typedText, setTypedText] = useState(value)
    const [visible, setVisible] = useState(false)
    const [shouldFilter, setShouldFilter] = useState(false)

    const handleTypedTextChange = (e) => {
        if (!shouldFilter) setShouldFilter(true)
        setTypedText(e.target.value)
}

    const handleClickOption = (option) => {
        if (shouldFilter) setShouldFilter(false)
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
            <div className={styles['wrapper']}>
                <div className={styles['input-container']}>
                    <input
                        name={name}
                        value={typedText}
                        onChange={handleTypedTextChange}
                        placeholder={placeHolder}
                        onFocus={() => setVisible(true)}
                        onBlur={(e) => {

                                const blurPoint = e
                                console.log('hex:', blurPoint)
                                // setShouldFilter(false)
                                
                                //select-list-ul
                                // setVisible(false)
                        }}
                    />
                    <div className={`${styles['right-caret']} ${visible && styles['hover']}`}>
                        &#10095;
                    </div>
                </div>

                <div>
                    {
                        filteredOptions.length
                    }
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
                                <ul className='select-list-ul'>
                                    {
                                        filteredOptions.map((optionsObj, index) => (
                                                <li className='select-list-li' key={index}
                                                    onClick={e => {
                                                        // e.preventDefault()
                                                        e.stopPropagation()
                                                        handleClickOption(optionsObj)
                                                    }}
                                                >
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