

export const QuestionButton = (props: {callback: () => void, title: string, borderless?: boolean}) => {
    const {callback, title, borderless = false} = props;

    return(
        <button type={"button"} className="ClearInput AddQuestionButton VerticalMargin"
        style={{borderBottom: borderless? 'none': ''}}
        onClick={() => {
            callback();
        }}
        >
            {title}
        </button>
    );
}