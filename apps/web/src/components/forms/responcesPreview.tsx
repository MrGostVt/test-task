


export const ResponcesPreview = (props: {title: string, callback: () => void}) => {
    const {title, callback} = props;

    return (
        <section className="FormPreview VerticalMargin" style={{
            borderTop: 'var(--FormPrev)',
            borderRight: '8px solid var(--Border-Green)',
            width: 'calc(90% - 8px - 10%)', display: 'flex', flexDirection: 'row',
            justifyContent: 'left', alignItems: 'center', fontSize: 'Larger',
            paddingLeft: '5%', paddingRight: '5%', overflow: 'hidden',
        }} onClick={callback}>
            {title}
        </section>
    )
}