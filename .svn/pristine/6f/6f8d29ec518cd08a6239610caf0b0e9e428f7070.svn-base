import React, { useMemo, useState } from 'react'
import { Avatar, Dropdown, Spinner, Tooltip } from 'components/ui'
import classNames from 'classnames'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import { useSelector, useDispatch } from 'react-redux'
import { setselectedCurrency } from 'store/locale/localeSlice'

import { HiCheck } from 'react-icons/hi'
const currencyList = [
    {
        label: 'United States Dollar $',
        code: 'USD',
        icon: '🇺🇸',
        value: '$',
        flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'
    },
    {
        label: 'Euro €',
        code: 'EUR',
        icon: '🇪🇺',
        value: '€',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg'
    },
    {
        label: 'British Pound £',
        code: 'GBP',
        icon: '🇬🇧',
        value: '£',
        flag: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg'
    },
    {
        label: 'Japanese Yen ¥',
        code: 'JPY',
        icon: '🇯🇵',
        value: '¥',
        flag: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg'
    },
    {
        label: 'Swiss Franc CHF',
        code: 'CHF',
        icon: '🇨🇭',
        value: 'CHF',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg'
    },
    {
        label: 'Chinese Yuan ¥',
        code: 'CNY',
        icon: '🇨🇳',
        value: '¥',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_China.svg'
    },
    {
        label: 'Swedish Krona kr',
        code: 'SEK',
        icon: '🇸🇪',
        value: 'kr',
        flag: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg'
    },
    {
        label: 'South Korean Won ₩',
        code: 'KRW',
        icon: '🇰🇷',
        value: '₩',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg'
    },
    {
        label: 'Turkish Lira ₺',
        code: 'TRY',
        icon: '🇹🇷',
        value: '₺',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg'
    },
    {
        label: 'Russian Ruble ₽',
        code: 'RUB',
        icon: '🇷🇺',
        value: '₽',
        flag: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg'
    },
    {
        label: 'Indian Rupee ₹',
        code: 'INR',
        icon: '🇮🇳',
        value: '₹',
        flag: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg'
    },
    {
        label: 'Brazilian Real R$',
        code: 'BRL',
        icon: '🇧🇷',
        value: 'R$',
        flag: 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg'
    },
    {
        label: 'South African R',
        code: 'ZAR',
        icon: '🇿🇦',
        value: 'R',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg'
    },
    {
        label: 'Saudi Riyal ﷼',
        code: 'SAR',
        icon: '🇸🇦',
        value: '﷼',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg'
    },
    {
        label: 'United Arab Emirates Dirham د.إ',
        code: 'AED',
        icon: '🇦🇪',
        value: 'د.إ',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg'
    },
    {
        label: 'Argentine Peso $',
        code: 'ARS',
        icon: '🇦🇷',
        value: '$',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg'
    },
    {
        label: 'Thai Baht ฿',
        code: 'THB',
        icon: '🇹🇭',
        value: '฿',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg'
    },
    {
        label: 'Malaysian Ringgit RM',
        code: 'MYR',
        icon: '🇲🇾',
        value: 'RM',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg'
    },
    {
        label: 'Norwegian Krone kr',
        code: 'NOK',
        icon: '🇳🇴',
        value: 'kr',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg'
    },
    {
        label: 'Singapore Dollar S$',
        code: 'SGD',
        icon: '🇸🇬',
        value: 'S$',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg'
    }
];




export const Currency = ({ className }) => {
    const [loading, setLoading] = useState(false)

    const locale = useSelector((state) => state.locale.selectedCurrency)
    const dispatch = useDispatch()

    const selectLangFlag = useMemo(() => {
        return currencyList.find((lang) => lang.flag === locale?.flag)
    }, [locale])

    const selectedLanguage = (
        <div className={classNames(className, 'flex items-center')}>
            {loading ? (
                <Spinner size={20} />
            ) : (
                <Avatar
                    size={24}
                    shape="circle"
                    src={`${selectLangFlag?.flag}`}
                />
            )}
        </div>
    )

    const onLanguageSelect = (lang) => {
        dispatch(setselectedCurrency(lang))
    }

    return (
        <Tooltip title='Select Country' placement="bottom">
            <Dropdown renderTitle={selectedLanguage} placement="bottom-end">
                {currencyList.map((lang) => (
                    <Dropdown.Item
                        className="mb-1 justify-between"
                        eventKey={lang.label}
                        key={lang.label}
                        onClick={() => onLanguageSelect(lang)}
                    >
                        <span className="flex items-center">
                            <Avatar
                                size={18}
                                shape="circle"
                                src={`${lang.flag}`}
                            />
                            <span className="ltr:ml-2 rtl:mr-2">{lang.label}</span>
                        </span>
                        {locale === lang.value && (
                            <HiCheck className="text-emerald-500 text-lg" />
                        )}
                    </Dropdown.Item>
                ))}
            </Dropdown>
        </Tooltip>
    )
}

export default withHeaderItem(Currency)