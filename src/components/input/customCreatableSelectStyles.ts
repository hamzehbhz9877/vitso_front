// customCreatableSelectStyles.ts
const customDefaultStyles = (meta: any) => ({
    control: (base: any, state: any) => ({
        ...base,
        minHeight: '82px',
        padding: '2px 10px',
        borderRadius: '0px',
        borderColor:
            meta?.touched && meta?.error
                ? '#f00 !important'
                : state.isFocused
                    ? '#000'
                    : '#e0e0e2',
        boxShadow: 'none',
        outline: 'none',
        '&:hover': {
            borderColor: state.isFocused ? '#000' : '#e0e0e2',
        },
    }),
    input: (base: any) => ({
        ...base,
        padding: 0,
        margin: 0,
        fontSize: '14px',
        height: 'auto',
        color: '#111827',
    }),
    placeholder: (base: any) => ({
        ...base,
        fontSize: '13px',
        color: '#9CA3AF',
    }),
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: '#f0f0f0',
        borderRadius: '6px',
        padding: '2px 4px',
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        fontSize: '12px',
    }),
    valueContainer: (base: any) => ({
        ...base,
        padding: '2px 6px',
        gap: '4px',
        flexWrap: 'wrap',
    }),
    clearIndicator: (base: any) => ({
        ...base,
        padding: '2px',
        color: '#6B7280',
        ':hover': {
            color: '#111827',
        },
    }),
    menu: (base: any) => ({
        ...base,
        zIndex: 9999,
        borderRadius: '8px',
        padding: '4px 0',
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isFocused ? '#f3f4f6' : 'white',
        color: state.isSelected ? '#2563eb' : '#111827',
        cursor: 'pointer',
        padding: '10px 14px',
    }),
})

export default customDefaultStyles
