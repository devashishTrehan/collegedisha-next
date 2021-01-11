import { makeStyles } from '@material-ui/styles';
import React from 'react';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const useStyles = makeStyles({
    markdownContainer: {
        fontFamily: 'gordita',
        textAlign: 'left',
        // '& table': {
        //     border: '1px solid black'
        // }
    }
})

function MarkdownParser(props: ReactMarkdownProps) {

    const styles = useStyles();

    return (
        <div className={styles.markdownContainer}>

            <ReactMarkdown plugins={[remarkGfm]} {...props} />
        </div>
    );
}

export default MarkdownParser;